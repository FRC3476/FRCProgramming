import { useCallback, useEffect, useState } from 'react'
import type { NavItem } from '../utils/buildNavItems'
import './ScrollNav.css'

type ScrollNavProps = {
  items: NavItem[]
}

export function ScrollNav({ items }: ScrollNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '')
  const [expanded, setExpanded] = useState(false)

  const scrollToItem = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveId(id)
    history.replaceState(null, '', `#${id}`)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && items.some((item) => item.id === hash)) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' })
        setActiveId(hash)
      })
    }
  }, [items])

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Set<string>()

    const updateActive = () => {
      if (visible.size > 0) {
        const sorted = items.filter((item) => visible.has(item.id))
        setActiveId(sorted[sorted.length - 1].id)
        return
      }

      let fallback: string | null = null
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          fallback = item.id
        }
      }
      if (fallback) setActiveId(fallback)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }
        updateActive()
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  return (
    <div
      className={`scroll-nav-container${expanded ? ' is-expanded' : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <nav
        className={`scroll-nav${expanded ? ' is-expanded' : ''}`}
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
