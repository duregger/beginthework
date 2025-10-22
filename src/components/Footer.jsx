import React from 'react'
import { Link } from 'react-router-dom'
import logoFooter from '../assets/img/logo/logo-footer.svg'
import TrackedLink from './TrackedLink'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-area secondary-bg pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="footer-left mb-30">
                <div className="footer-logo">
                  <Link to="/">
                    <img src={logoFooter} width="120px" alt="white BEGIN logo" />
                  </Link>
                </div>
                <div className="footer-text">
                  <p>&copy; 2025 Begin the work, LLC</p>
                  <p>Oklahoma City, OK</p>
                </div>
                <div className="footer-icon">
                  <a href="https://www.instagram.com/beginthework/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/begin-the-work/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="footer-right">
                <h2>Helping you begin.</h2>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <div className="footer-single-content mb-30">
                      <span>On Substack</span>
                      <a href="https://beginthework.substack.com" target="_blank" rel="noopener noreferrer">@beginthework</a>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <div className="footer-single-content mb-30">
                      <span>Say Hey!</span>
                      <a href="mailto:btw@hey.com">btw@hey.com</a>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <div className="footer-single-content mb-30">
                      <span>Speaking Inquiries</span>
                      <a href="mailto:sam@beginthework.com">sam@beginthework.com</a>
                    </div>
                  </div>
                </div>
                
                {/* Cross-linking to samduregger.com ecosystem */}
                <div className="row mt-4">
                  <div className="col-xl-12">
                    <div className="footer-single-content">
                      <span>Founded by <TrackedLink href="https://samduregger.com" siteSection="footer" contentType="founder_link" linkType="footer">Sam DuRegger</TrackedLink></span>
                      <div className="mt-2">
                        <TrackedLink href="https://story.build" siteSection="footer" contentType="publishing_site" linkType="footer" className="me-3">StoryBuild Publishing</TrackedLink>
                        <TrackedLink href="https://gutenstack.com" siteSection="footer" contentType="reading_platform" linkType="footer" className="me-3">GutenStack</TrackedLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
