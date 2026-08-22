import { Link } from 'react-router-dom'

export function HomeBackLink() {
  return (
    <Link to="/" className="page-back">
      <span className="page-back__arrow" aria-hidden="true">
        ←
      </span>
      Back to landing page
    </Link>
  )
}
