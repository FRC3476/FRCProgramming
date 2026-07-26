import { NavLink } from 'react-router-dom'
import './TopNav.css'

export function TopNav() {
  return (
    <header className="top-nav">
      <NavLink to="/" className="top-nav__brand">
        FRC Curriculum
      </NavLink>
      <nav className="top-nav__links" aria-label="Site sections">
        <NavLink to="/beginner" className="top-nav__link">
          Beginner
        </NavLink>
        <NavLink to="/advanced" className="top-nav__link">
          Advanced
        </NavLink>
      </nav>
    </header>
  )
}
