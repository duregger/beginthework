import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/img/logo/logo.svg'
import logoFooter from '../assets/img/logo/logo-footer.svg'
import storybuildSidebar from '../assets/img/projects/StoryBuild-sidebar.png'
import wylderSidebar from '../assets/img/projects/Wylder-sidebar.png'
import beginStrengthSidebar from '../assets/img/projects/Begin-Strength-sidebar.png'
import gutenstackSidebar from '../assets/img/projects/GutenStack-sidebar.png'
import ibfpSidebar from '../assets/img/projects/I-Build-For-People-Sidebar.png'
import artificialllySidebar from '../assets/img/projects/Artificiallly-sidebar.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <header>
      <div className="header-area header-sticky">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-md-4 d-flex align-items-center">
              <div className="logo">
                <Link to="/">
                  <img src={logo} width="125px" alt="begin logo" />
                </Link>
              </div>
            </div>
            <div className="col-xl-7 d-none d-xl-block">
            </div> 
            <div className="col-xl-3 col-lg-9 col-md-8 d-flex align-items-center justify-content-end">
              <div className="header-right">
                <div className="bar f-right" onClick={toggleMenu}>
                  <i className="fas fa-bars"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Side menu */}
        <div ref={menuRef} className={`btn-menu-main ${isMenuOpen ? 'active' : ''}`}>
          <i className="fas fa-times crose" onClick={toggleMenu}></i>
          <div className="logo-side mb-30">
            <Link to="/" onClick={closeMenu}>
              <img src={logoFooter} width="120px" alt="white BEGIN logo" />
            </Link>
          </div>
          
          <div className="side-info mb-30">
            <div className="contact-list mb-30">
              <h4>Say Hey!</h4>
              <p><a href="mailto:btw@hey.com">btw@hey.com</a></p>
            </div>
            <div className="social-icon-right mt-20">
              <a href="https://www.instagram.com/beginthework/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/begin-the-work" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div className="side-info mb-30">
            <div className="contact-list mb-30">
              <h4><Link to="/about" onClick={closeMenu}>About</Link></h4>
              <h4><Link to="/speaking" onClick={closeMenu}>Speaking</Link></h4>
              <h4><Link to="/podcast" onClick={closeMenu}>Podcast</Link></h4>
              <h4><a href="https://beginthework.substack.com" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Substack</a></h4>
            </div>
          </div>
          
          <div className="side-info mb-30">
            <div className="contact-list mb-30">
              <h4>Notable Projects</h4>
              <br/>
              <div className="instagram">
              <a href="https://story.build" target="_blank" rel="noopener noreferrer">
                  <img src={storybuildSidebar} alt="StoryBuild" />
                </a>
                <a href="https://app.wylder.cc" target="_blank" rel="noopener noreferrer">
                  <img src={wylderSidebar} alt="Wylder App" />
                </a>
                <a href="https://beginthe.work" target="_blank" rel="noopener noreferrer">
                  <img src={beginStrengthSidebar} alt="Begin Strength" />
                </a>
              </div>
              <div className="instagram">
              <a href="https://gutenstack.com" target="_blank" rel="noopener noreferrer">
                  <img src={gutenstackSidebar} alt="GutenStack" />
                </a>
                
                <a href="https://story.build/books/i-build-for-people" target="_blank" rel="noopener noreferrer">
                  <img src={ibfpSidebar} alt="I Build For People" />
                </a>
                
                <a href="https://artificiallly.com" target="_blank" rel="noopener noreferrer">
                  <img src={artificialllySidebar} alt="Artificiallly Intelligent Conversations" />
                </a>
                
                
              </div>
            </div>
          </div>
          
          <div className="side-info mb-30">
            <div className="contact-list mb-30">
              <h4>&copy; 2025 Begin the work, LLC</h4>
              <p>Oklahoma City, OK</p>
              <p><a href="mailto:btw@hey.com">btw@hey.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
