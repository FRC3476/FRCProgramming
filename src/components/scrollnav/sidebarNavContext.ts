import { createContext, useContext } from 'react'

export const SCROLL_NAV_ID = 'scroll-nav'

export type SidebarNavContextValue = {
  hasSidebar: boolean
  overlayOpen: boolean
  toggleOverlay: () => void
  setOverlayOpen: (open: boolean) => void
  registerSidebar: () => () => void
}

export const SidebarNavContext = createContext<SidebarNavContextValue | null>(null)

export function useSidebarNav(): SidebarNavContextValue {
  const context = useContext(SidebarNavContext)
  if (!context) {
    throw new Error('useSidebarNav must be used within SidebarNavProvider')
  }
  return context
}
