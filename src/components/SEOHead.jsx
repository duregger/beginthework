import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title, 
  description, 
  image, 
  url, 
  type = "website",
  keywords = "digital strategy, product management, AI consulting, Oklahoma City, Sam DuRegger, Begin the Work",
  author = "Sam DuRegger"
}) => {
  const baseUrl = 'https://beginthework.com'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/OG.png`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Begin the Work" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  )
}

export default SEOHead
