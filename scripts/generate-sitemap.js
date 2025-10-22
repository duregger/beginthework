#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON files
const projectsData = JSON.parse(fs.readFileSync('./src/data/projects.json', 'utf8'));
const speakingData = JSON.parse(fs.readFileSync('./src/data/speaking.json', 'utf8'));

// Note: Podcast episodes are stored in Firebase and accessed dynamically
// To add podcast episodes to sitemap, you can manually add them here or create a script to fetch from Firebase
const podcastEpisodes = [
  // Add individual podcast episodes here manually
  // Example: { url: '/podcast/episode-slug', priority: 0.6, changefreq: 'monthly' }
  
  // Season 1 Episodes (add these manually based on your Firebase data)
  { url: '/podcast/intro', priority: 0.6, changefreq: 'monthly' },
  { url: '/podcast/andy-braner', priority: 0.6, changefreq: 'monthly' },
  { url: '/podcast/ben-nockels', priority: 0.6, changefreq: 'monthly' },
  { url: '/podcast/evan-dewalt', priority: 0.6, changefreq: 'monthly' },
  { url: '/podcast/heady-coleman', priority: 0.6, changefreq: 'monthly' },
  { url: '/podcast/jeremy-gardner', priority: 0.6, changefreq: 'monthly' },
  { url: '/podcast/lesson-1', priority: 0.6, changefreq: 'monthly' },
  { url: '/podcast/todd-smith', priority: 0.6, changefreq: 'monthly' },
  { url: '/podcast/studio-dewalt', priority: 0.6, changefreq: 'monthly' },
  
  // Season 2 Episodes
  { url: '/podcast/season-2', priority: 0.6, changefreq: 'monthly' }
];

const baseUrl = 'https://beginthework.com';
const now = new Date().toISOString();

// Static pages
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/about', priority: 0.9, changefreq: 'monthly' },
  { url: '/speaking', priority: 0.9, changefreq: 'weekly' },
  { url: '/podcast', priority: 0.8, changefreq: 'weekly' }
];

// Note: Individual project and speaking pages are not built yet
// They will be added when individual pages are created
const projectPages = [];
const speakingPages = [];

// Combine all pages
const allPages = [...staticPages, ...projectPages, ...speakingPages, ...podcastEpisodes];

// Generate XML sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to public folder
fs.writeFileSync('./public/sitemap.xml', sitemap);

console.log('✅ Sitemap generated successfully!');
console.log(`📊 Total pages: ${allPages.length}`);
console.log(`📁 Static pages: ${staticPages.length}`);
console.log(`💼 Project pages: ${projectPages.length} (not built yet)`);
console.log(`🎤 Speaking pages: ${speakingPages.length} (not built yet)`);
console.log(`🎙️ Podcast episodes: ${podcastEpisodes.length} (not built yet)`);
console.log(`📍 Location: ./public/sitemap.xml`);
