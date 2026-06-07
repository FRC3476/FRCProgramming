import './SiteFooter.css'

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="logo-bracket">&lt;</span>
        FRC
        <span className="logo-accent">dev</span>
        <span className="logo-bracket">/&gt;</span>
      </div>
      <p className="footer-copy">Built for FRC teams, by FRC teams. Not affiliated with FIRST®.</p>
      <div className="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  )
}
