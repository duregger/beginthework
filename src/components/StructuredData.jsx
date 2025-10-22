import React from 'react'

// Person Schema for Sam DuRegger
export const PersonSchema = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sam DuRegger",
    "jobTitle": "Product Strategist & Digital Transformation Consultant",
    "description": "Helping businesses begin and finish what they've begun through agile digital strategy and AI implementation.",
    "url": "https://beginthework.com/about",
    "image": "https://beginthework.com/src/assets/img/team/Sam-DuRegger_Ai_Portrait.jpg",
    "sameAs": [
      "https://samduregger.com",
      "https://story.build",
      "https://beginthework.substack.com",
      "https://www.linkedin.com/in/samduregger",
      "https://www.instagram.com/beginthework"
    ],
    "knowsAbout": [
      "Product Management",
      "Digital Transformation",
      "AI Strategy",
      "Agile Development",
      "User Experience Design",
      "Coffee Business",
      "Publishing"
    ],
    "alumniOf": "Oklahoma State University",
    "workLocation": {
      "@type": "Place",
      "name": "Oklahoma City, Oklahoma"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "btw@hey.com",
      "contactType": "Business Inquiries"
    }
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(personSchema)}
    </script>
  )
}

// Organization Schema for Begin the Work
export const OrganizationSchema = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Begin the Work, LLC",
    "description": "Digital strategy and product consulting firm specializing in AI implementation and agile development.",
    "url": "https://beginthework.com",
    "logo": "https://beginthework.com/src/assets/img/logo/logo.svg",
    "founder": {
      "@type": "Person",
      "name": "Sam DuRegger"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Oklahoma City",
      "addressRegion": "Oklahoma",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "btw@hey.com",
      "contactType": "Business Inquiries"
    },
    "sameAs": [
      "https://samduregger.com",
      "https://story.build",
      "https://beginthework.substack.com"
    ]
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(orgSchema)}
    </script>
  )
}

// Speaking Event Schema
export const SpeakingEventSchema = ({ topic }) => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": topic.title,
    "description": topic.shortDescription,
    "organizer": {
      "@type": "Person",
      "name": "Sam DuRegger",
      "url": "https://beginthework.com/about"
    },
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "1500",
      "priceCurrency": "USD",
      "description": "Speaking fees vary based on event type and duration. Investment typically ranges from $1,500-$3,000 for keynotes."
    }
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(eventSchema)}
    </script>
  )
}

// WebSite Schema
export const WebSiteSchema = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Begin the Work",
    "url": "https://beginthework.com",
    "description": "Digital strategy and product consulting firm helping businesses begin and finish what they've begun.",
    "publisher": {
      "@type": "Organization",
      "name": "Begin the Work, LLC"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://beginthework.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(websiteSchema)}
    </script>
  )
}

// Breadcrumb Schema
export const BreadcrumbSchema = ({ items }) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(breadcrumbSchema)}
    </script>
  )
}
