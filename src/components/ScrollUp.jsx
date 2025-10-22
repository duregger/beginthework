import React, { useState, useEffect } from 'react'

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div
      id="scrollUp"
      className={`scroll-up ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '24px',
        right: '14px',
        width: '50px',
        height: '50px',
        backgroundColor: '#ff3d4f',
        color: '#fff',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '48px',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
    >
      <i className="fas fa-chevron-up"></i>
    </div>
  )
}

export default ScrollUp
