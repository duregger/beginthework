import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollUp from './components/ScrollUp'
import Home from './pages/Home'
import About from './pages/About'
import Speaking from './pages/Speaking'
import Podcast from './pages/Podcast'
import PodcastEpisode from './pages/PodcastEpisode'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { PersonSchema, OrganizationSchema, WebSiteSchema } from './components/StructuredData'
import { initializeGA4 } from './utils/analytics'
import './App.css'

function App() {
  console.log('App component rendering...')
  
  // Initialize GA4 on app load
  useEffect(() => {
    initializeGA4()
  }, [])
  
  return (
    <div className="App">
      {/* Structured Data */}
      <PersonSchema />
      <OrganizationSchema />
      <WebSiteSchema />
      
      <Header />
      
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/speaking" element={<Speaking />} />
                <Route path="/podcast" element={<Podcast />} />
                <Route path="/podcast/:episodeId" element={<PodcastEpisode />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
      
      <Footer />
      <ScrollUp />
    </div>
  )
}

export default App
