import React from 'react'

const TrackedLink = ({ 
  href, 
  children, 
  siteSection, 
  contentType, 
  linkType = 'content',
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer'
}) => {
  const handleClick = () => {
    // GA4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cross_domain_click', {
        'event_category': 'Navigation',
        'event_label': href,
        'site_section': siteSection || 'unknown',
        'content_type': contentType || 'unknown',
        'link_type': linkType,
        'referring_site': 'beginthework.com'
      })
    }

    // Cross-site navigation tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cross_site_navigation', {
        'event_category': 'Navigation',
        'event_label': href,
        'source_site': 'beginthework.com',
        'destination_site': new URL(href).hostname,
        'link_type': linkType
      })
    }
  }

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  )
}

export default TrackedLink
