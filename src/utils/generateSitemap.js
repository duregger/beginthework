import { projectsData } from '../data/projects.json'
import { speakingData } from '../data/speaking.json'

const generateSitemap = () => {
  const baseUrl = 'https://beginthework.com'
  
  // Static pages
  const staticPages = [
    { 
      url: '/', 
      priority: 1.0, 
      changefreq: 'weekly',
      lastmod: new Date().toISOString()
    },
    { 
      url: '/about', 
      priority: 0.9, 
      changefreq: 'monthly',
      lastmod: new Date().toISOString()
    },
    { 
      url: '/speaking', 
      priority: 0.9, 
      changefreq: 'weekly',
      lastmod: new Date().toISOString()
    },
    { 
      url: '/podcast', 
      priority: 0.8, 
      changefreq: 'weekly',
      lastmod: new Date().toISOString()
    }
  ]

  // Generate project pages from projects.json
  const projectPages = []
  Object.values(projectsData).forEach(section => {
    section.items.forEach(project => {
      projectPages.push({
        url: `/projects/${project.id}`,
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: new Date().toISOString()
      })
    })
  })

  // Generate speaking topic pages from speaking.json
  const speakingPages = []
  Object.values(speakingData).forEach(section => {
    section.items.forEach(topic => {
      speakingPages.push({
        url: `/speaking/${topic.id}`,
        priority: 0.6,
        changefreq: 'monthly',
        lastmod: new Date().toISOString()
      })
    })
  })

  // Combine all pages
  const allPages = [...staticPages, ...projectPages, ...speakingPages]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return sitemap
}

export default generateSitemap
