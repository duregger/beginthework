import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEOHead from '../components/SEOHead'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { trackPageView, trackConversion } from '../utils/analytics'
import './PodcastEpisode.css'

// Utility function to extract YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

const PodcastEpisode = () => {
  const { episodeId } = useParams()
  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)

  // GA4 Page View Tracking
  useEffect(() => {
    if (episode) {
      trackPageView(`${episode.title} - Podcast Episode`, `/podcast/${episodeId}`)
    }
  }, [episode, episodeId])

  // GA4 Button Click Tracking
  const handleButtonClick = (action, label, category = 'Podcast') => {
    trackConversion(`${category}_${action}`, label)
  }

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        // First try to find by slug
        const episodesRef = collection(db, 'podcast-episodes')
        const slugQuery = query(episodesRef, where('slug', '==', episodeId))
        const slugSnapshot = await getDocs(slugQuery)
        
        if (!slugSnapshot.empty) {
          // Found by slug
          const episodeDoc = slugSnapshot.docs[0]
          const episodeData = { id: episodeDoc.id, ...episodeDoc.data() }
          // Episode data found successfully
          setEpisode(episodeData)
        } else {
          // Fallback: try to find by document ID
          const episodeRef = doc(db, 'podcast-episodes', episodeId)
          const episodeSnap = await getDoc(episodeRef)
          
          if (episodeSnap.exists()) {
            setEpisode({ id: episodeSnap.id, ...episodeSnap.data() })
          } else {
            setEpisode(null)
          }
        }
      } catch (error) {
        console.error('Error fetching episode:', error)
        setEpisode(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEpisode()
  }, [episodeId])


  if (loading) {
    return (
      <div className="episode-loading">
        <div className="container">
          <div className="text-center">
            <h2>Loading episode...</h2>
          </div>
        </div>
      </div>
    )
  }

  if (!episode) {
    return (
      <div className="episode-not-found">
        <div className="container">
          <div className="text-center">
            <h2>Episode not found</h2>
            <Link to="/podcast" className="btn btn-primary">Back to Podcast</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead 
        title={`${episode.title} | BEGIN the podcast`}
        description={episode.description}
        keywords={`Begin the work, podcast, ${episode.title}, Sam DuRegger, entrepreneurship, digital innovation`}
        url={`/podcast/${episodeId}`}
        image="/social-share-OG.png"
        type="article"
      />

      <section className="episode-hero pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 mx-auto">
              <div className="episode-header text-center mb-55">
                <h1>{episode.title}</h1>
                <p className="episode-meta">
                  Season {episode.season} • Episode {episode.episodeNumber} • {new Date(episode.publishedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="episode-content pt-90 pb-120" style={{minHeight: 'auto'}}>
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10 mx-auto" style={{minHeight: 'auto'}}>
              <div className="back-link-container mb-30">
                <Link to="/podcast" className="back-link">← Back to Podcast Episodes</Link>
              </div>
              
              <div className="episode-player mb-50">
                <div className="player-container">
                  <img src={episode.imageUrl} alt={episode.title} className="episode-image" />
                  <div className="audio-player">
                    <audio controls preload="none" style={{width: '100%'}}>
                      <source src={episode.audioUrl} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                    <div className="player-links">
                      <a href="http://pca.st/" target="_blank" rel="noopener noreferrer">Listen on Pocket Casts</a>
                      <a href="https://podcasts.apple.com/us/podcast/begin-the-work/" target="_blank" rel="noopener noreferrer">Listen on Apple Podcasts</a>
                    </div>
                  </div>

                  {/* YouTube Video Section */}
                  {episode.youtubeUrl && getYouTubeVideoId(episode.youtubeUrl) && (
                    <div className="youtube-video-section">
                      <h3>Watch on YouTube</h3>
                      <div className="youtube-video-container">
                        <iframe
                          width="100%"
                          height="315"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(episode.youtubeUrl)}`}
                          title={`${episode.title} - YouTube Video`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="youtube-links">
                        <a href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="episode-description">
                <h2>Episode Summary</h2>
                <p>{episode.description}</p>
              </div>

              {/* About Guest */}
              {episode.about && (
                <div className="episode-summary">
                  <h2>About Guest</h2>
                  <p>{episode.about}</p>
                </div>
              )}

              {/* Show Notes */}
              {episode.showNotes && (
                <div className="episode-show-notes">
                  <h2>Show Notes</h2>
                  <div className="show-notes-content" dangerouslySetInnerHTML={{ __html: episode.showNotes }} />
                </div>
              )}

              <div className="episode-footer mt-50">
                <div className="row">
                  <div className="col-md-6">
                    <h3>About the Host</h3>
                    <p>
                      <a href="https://samduregger.com" target="_blank" rel="noopener noreferrer">Sam DuRegger</a> is the founder of Begin the Work, LLC and host of Begin the Podcast.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h3>Connect</h3>
                    <p>
                      <a href="mailto:btw@hey.com">btw@hey.com</a><br/>
                      <a href="https://beginthework.substack.com" target="_blank" rel="noopener noreferrer">Substack</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PodcastEpisode
