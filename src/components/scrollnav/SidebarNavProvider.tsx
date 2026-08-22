import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { SidebarNavContext } from './sidebarNavContext'

export function SidebarNavProvider({ children }: { children: ReactNode }) {
  const [sidebarCount, setSidebarCount] = useState(0)
  const [overlayOpen, setOverlayOpen] = useState(false)

  const registerSidebar = useCallback(() => {
    setSidebarCount((count) => count + 1)
    return () => {
      setSidebarCount((count) => count - 1)
      setOverlayOpen(false)
    }
  }, [])

  const toggleOverlay = useCallback(() => {
    setOverlayOpen((open) => !open)
  }, [])

  const value = useMemo(
    () => ({
      hasSidebar: sidebarCount > 0,
      overlayOpen,
      toggleOverlay,
      setOverlayOpen,
      registerSidebar,
    }),
    [sidebarCount, overlayOpen, toggleOverlay, registerSidebar],
  )

  return (
    <SidebarNavContext.Provider value={value}>{children}</SidebarNavContext.Provider>
  )
}
