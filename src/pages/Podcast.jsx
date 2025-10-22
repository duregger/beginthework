import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEOHead from '../components/SEOHead'
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/config'
import { trackPageView, trackConversion } from '../utils/analytics'
import './Podcast.css'
import SliderPod from '../components/Slider-Pod'

const Podcast = () => {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  // GA4 Page View Tracking
  useEffect(() => {
    trackPageView('Podcast - Begin the Work', '/podcast')
  }, [])


  // GA4 Button Click Tracking
  const handleButtonClick = (action, label, category = 'Podcast') => {
    trackConversion(`${category}_${action}`, label)
  }

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodesRef = collection(db, 'podcast-episodes')
        const q = query(episodesRef, orderBy('publishedDate', 'desc'))
        const querySnapshot = await getDocs(q)
        
        const episodesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setEpisodes(episodesData)
      } catch (error) {
        console.error('Error fetching episodes:', error)
        setEpisodes([])
      } finally {
        setLoading(false)
      }
    }

    fetchEpisodes()
  }, [])


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="podcast-loading">
        <div className="container">
          <div className="text-center">
            <h2>Loading episodes...</h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead 
        title="BEGIN | the podcast - Entrepreneurship & Digital Innovation Stories"
        description="In 'Begin the Podcast' Sam DuRegger explores the Begin framework with artists, creatives, and entrepreneurs hearing the story of how they progressed from an idea through concept and ultimately to failure or success, and what's next."
        keywords="Begin the podcast, entrepreneurship stories, digital innovation, startup podcast, conversations, Sam DuRegger, creative entrepreneurs, business stories, innovation framework"
        url="/podcast"
        image="/social-share-OG.png"
        type="website"
      />

<SliderPod />

      {/* Dynamic Episodes */}
      {episodes.map((episode) => (
        <section key={episode.id} id={episode.id} className={`pt-120 ${episode.type === 'announcement' ? 'dark' : ''}`}>
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4">
                <div className="section-header">
                  <div className="newsfeed-img">
                    {episode.imageUrl && (
                      <img src={episode.imageUrl} alt={episode.title} />
                    )}
                  </div>
                  <br/>
                  
                  {episode.audioUrl && (
                    <div className="player" style={{padding: "0 0 10px 0"}} align="center">
                      <audio id={`player-${episode.id}`} preload="none" controls style={{maxWidth: "90%"}}>
                        <source src={episode.audioUrl} type="audio/wav" />
                      </audio>
                      <br/>
                      <a href="http://pca.st/11Rf" target="_blank" rel="noopener noreferrer">Listen on Pocket Casts</a>
                      <br/>
                      <a href="https://podcasts.apple.com/us/podcast/begin-the-work/id1474915794" target="_blank" rel="noopener noreferrer">Listen on Apple Podcasts</a>
                      <hr />
                    </div>   
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="about-right">
                  <div className="section-header">
                    <span>
                      {episode.type === 'announcement' ? 'Season 2 - Announcement' : 
                       episode.type === 'intro' ? 'Intro - Podcast Notes' : 
                       `Ep. ${episode.episodeNumber} - Podcast ${episode.type === 'episode' ? 'Summary' : 'Notes'}`}
                    </span>
                  </div>
                  <h2><Link to={`/podcast/${episode.slug || episode.id}`}>{episode.title}</Link></h2>
                  <hr />
                  <p>{episode.description}</p>
                  
                  <Link to={`/podcast/${episode.slug || episode.id}`} className="btn btn-other">Podcast Notes</Link>
                </div>	 
              </div>
            </div>
            <div className="single-border"></div>
          </div>
        </section>
      ))}
    </>
  )
}

export default Podcast