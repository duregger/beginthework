import React from 'react'
import { Link } from 'react-router-dom'

const EpisodeCard = ({ episode }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="episode-card mb-30">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-10 mx-auto">
            <div className="episode-content">
              <div className="episode-header">
                <span className="episode-meta">
                  Season {episode.season} • Episode {episode.episodeNumber} • {formatDate(episode.publishedDate)}
                </span>
                <h3 className="episode-title">
                  <Link to={`/podcast/${episode.id}`}>
                    {episode.title}
                  </Link>
                </h3>
              </div>
              
              <div className="episode-description">
                <p>{episode.description}</p>
              </div>
              
              <div className="episode-actions">
                <Link to={`/podcast/${episode.id}`} className="btn btn-primary">
                  Listen Now
                </Link>
                {episode.type === 'episode' && (
                  <a 
                    href="https://podcasts.apple.com/us/podcast/begin-the-work/id1474915794" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline"
                  >
                    Subscribe on Apple Podcasts
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EpisodeCard