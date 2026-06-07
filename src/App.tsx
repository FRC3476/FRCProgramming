import { createElement, startTransition, useEffect, useState } from 'react'
import { SiteFooter } from './components/SiteFooter'
import { SiteNav } from './components/SiteNav'
import { getAppPath, LEARN_PATH, type AppPath } from './routes'
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState<AppPath>(() => getAppPath(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => {
      startTransition(() => {
        setActivePath(getAppPath(window.location.pathname))
        setMenuOpen(false)
      })
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateTo = (path: AppPath) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
    }

    window.scrollTo({ top: 0, left: 0 })

    startTransition(() => {
      setActivePath(path)
      setMenuOpen(false)
    })
  }

  const closeMenu = () => {
    startTransition(() => {
      setMenuOpen(false)
    })
  }

  const toggleMenu = () => {
    startTransition(() => {
      setMenuOpen(open => !open)
    })
  }

  return createElement(
    'div',
    { className: 'app' },
    createElement('div', { className: 'grid-bg', 'aria-hidden': true }),
    // createElement('div', { className: 'noise-overlay', 'aria-hidden': true }),
    createElement(SiteNav, {
      activePath,
      menuOpen,
      onCloseMenu: closeMenu,
      onNavigate: navigateTo,
      onToggleMenu: toggleMenu,
    }),
    createElement(HomePage, { onStartLearning: () => navigateTo(LEARN_PATH) }),
    createElement(SiteFooter),
  )
}

export default App
