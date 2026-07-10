import { Outlet } from 'react-router-dom'
import { TopNav } from './topnav/TopNav'
import './PageLayout.css'

export function AppLayout() {
  return (
    <>
      <TopNav />
      <Outlet />
    </>
  )
}
