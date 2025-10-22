// GA4 Configuration and tracking utilities

// Cross-domain configuration
export const GA4_CONFIG = {
  measurementId: 'G-MTE7Q59SFQ',
  domains: [
    'beginthework.com',
    'samduregger.com', 
    'story.build',
    'gutenstack.com',
    'espressoplusmilk.com',
    'tmrw.coffee',
    'baristabot.app',
    'cof-e.ai'
  ]
}

// Initialize GA4 with cross-domain tracking
export const initializeGA4 = () => {
  if (typeof gtag !== 'undefined') {
    gtag('config', GA4_CONFIG.measurementId, {
      'linker': {
        'domains': GA4_CONFIG.domains
      },
      'custom_map': {
        'custom_parameter_1': 'site_section',
        'custom_parameter_2': 'referring_site',
        'custom_parameter_3': 'content_type'
      }
    })
  }
}

// Custom events for cross-site analytics
export const trackSpeakingEngagement = (action, topic, referringSite = 'beginthework.com') => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'speaking_engagement', {
      'event_category': 'Speaking',
      'event_label': topic,
      'action': action, // 'view', 'contact', 'book'
      'referring_site': referringSite,
      'content_type': 'speaking_topic'
    })
  }
}

export const trackProjectEngagement = (action, project, referringSite = 'beginthework.com') => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'project_engagement', {
      'event_category': 'Projects',
      'event_label': project,
      'action': action, // 'view', 'contact', 'learn_more'
      'referring_site': referringSite,
      'content_type': 'project_case_study'
    })
  }
}

export const trackCrossSiteNavigation = (destination, source = 'beginthework.com', linkType) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'cross_site_navigation', {
      'event_category': 'Navigation',
      'event_label': destination,
      'source_site': source,
      'destination_site': destination,
      'link_type': linkType // 'footer', 'header', 'content', 'cta'
    })
  }
}

export const trackPageView = (pageTitle, pagePath) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      'page_title': pageTitle,
      'page_location': window.location.href,
      'page_path': pagePath
    })
  }
}

export const trackConversion = (conversionType, value = null) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'event_category': 'Conversion',
      'event_label': conversionType,
      'value': value
    })
  }
}

// Custom dimensions
export const CUSTOM_DIMENSIONS = {
  'site_section': 'dimension1', // home, about, speaking, projects
  'referring_site': 'dimension2', // which site referred the user
  'content_type': 'dimension3', // speaking_topic, project, blog_post
  'user_journey': 'dimension4', // new_visitor, returning, cross_site
  'conversion_funnel': 'dimension5' // awareness, consideration, decision
}
