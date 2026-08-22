import { Outlet } from 'react-router-dom'
import { SidebarNavProvider } from './scrollnav/SidebarNavProvider'
import { TopNav } from './topnav/TopNav'
import './PageLayout.css'

export function AppLayout() {
  return (
    <SidebarNavProvider>
      <TopNav />
      <Outlet />
    </SidebarNavProvider>
  )
}
