import { useCallback, useEffect, useRef, useState } from 'react'
import type { NavItem } from '../../utils/buildNavItems'
import './ScrollNav.css'

type ScrollNavProps = {
  items: NavItem[]
}

const ACTIVE_OFFSET_RATIO = 0.4
const SCROLL_END_DEBOUNCE_MS = 100

function getActiveLine(): number {
  return window.innerHeight * ACTIVE_OFFSET_RATIO
}

function stepActiveIndex(
  items: NavItem[],
  activeIndex: number,
  scrollingDown: boolean,
): number {
  const line = getActiveLine()

  if (scrollingDown) {
    const next = items[activeIndex + 1]
    if (!next) return activeIndex
    const top = document.getElementById(next.id)?.getBoundingClientRect().top
    if (top !== undefined && top <= line) {
      return activeIndex + 1
    }
    return activeIndex
  }

  const current = items[activeIndex]
  if (!current || activeIndex === 0) return activeIndex
  const top = document.getElementById(current.id)?.getBoundingClientRect().top
  if (top !== undefined && top > line) {
    return activeIndex - 1
  }
  return activeIndex
}

function indexFromId(items: NavItem[], id: string): number {
  const index = items.findIndex((item) => item.id === id)
  return index >= 0 ? index : 0
}

export function ScrollNav({ items }: ScrollNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')
  const activeIndexRef = useRef(0)
  const lastScrollYRef = useRef(0)

  const setActive = useCallback(
    (id: string) => {
      activeIndexRef.current = indexFromId(items, id)
      setActiveId(id)
    },
    [items],
  )

  const scrollToItem = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
      history.replaceState(null, '', `#${id}`)
    },
    [setActive],
  )

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && items.some((item) => item.id === hash)) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' })
        setActive(hash)
      })
    }
  }, [items, setActive])

  useEffect(() => {
    if (items.length === 0) return

    activeIndexRef.current = indexFromId(items, activeId)
    lastScrollYRef.current = window.scrollY

    let timeoutId: ReturnType<typeof setTimeout>

    const settle = () => {
      const id = items[activeIndexRef.current]?.id
      if (id) setActiveId(id)
    }

    const onScroll = () => {
      const scrollY = window.scrollY
      const scrollingDown = scrollY > lastScrollYRef.current
      const scrollingUp = scrollY < lastScrollYRef.current
      lastScrollYRef.current = scrollY

      if (scrollingDown || scrollingUp) {
        activeIndexRef.current = stepActiveIndex(
          items,
          activeIndexRef.current,
          scrollingDown,
        )
      }

      clearTimeout(timeoutId)
      timeoutId = setTimeout(settle, SCROLL_END_DEBOUNCE_MS)
    }

    const onScrollEnd = () => {
      clearTimeout(timeoutId)
      settle()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scrollend', onScrollEnd, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', onScrollEnd)
    }
  }, [items])

  return (
    <div className="scroll-nav-container">
      <nav
        className="scroll-nav"
        style={{ ['--nav-count' as string]: items.length }}
        aria-label="Page sections"
      >
        <ul className="scroll-nav__list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`scroll-nav__item${item.level === 1 ? ' scroll-nav__item--sub' : ''}`}
            >
              <button
                type="button"
                className={`scroll-nav__button${activeId === item.id ? ' is-active' : ''}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                onClick={() => scrollToItem(item.id)}
              >
                <span className="scroll-nav__mark" aria-hidden="true" />
                <span className="scroll-nav__label">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
