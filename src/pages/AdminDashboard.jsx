import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, getDocs, orderBy, query, doc, deleteDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import EpisodeForm from '../components/EpisodeForm'
import { addSlugsToEpisodes } from '../utils/addSlugsToEpisodes'
import { updateAndyBranerShowNotes, updateAllSeason1ShowNotes } from '../utils/updateShowNotes'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [user, setUser] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEpisode, setEditingEpisode] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email.endsWith('@beginthework.com')) {
        setUser(user)
        fetchEpisodes()
      } else {
        navigate('/admin/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const fetchEpisodes = async () => {
    try {
      const episodesRef = collection(db, 'podcast-episodes')
      const q = query(episodesRef, orderBy('episodeNumber', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const episodesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // Sort episodes in descending order: highest episode number first, episode 0 last
      const sortedEpisodes = episodesData.sort((a, b) => {
        if (a.episodeNumber === 0) return 1  // Episode 0 always last
        if (b.episodeNumber === 0) return -1 // Episode 0 always last
        return b.episodeNumber - a.episodeNumber // Others in descending order
      })
      
      setEpisodes(sortedEpisodes)
    } catch (error) {
      console.error('Error fetching episodes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSlugs = async () => {
    if (window.confirm('This will add URL slugs to all existing episodes. Continue?')) {
      try {
        const result = await addSlugsToEpisodes()
        if (result.success) {
          alert(`✅ Successfully added slugs to ${result.count} episodes!`)
          fetchEpisodes() // Refresh the list
        } else {
          alert(`❌ Error: ${result.error}`)
        }
      } catch (error) {
        console.error('Error adding slugs:', error)
        alert('Error adding slugs. Check console for details.')
      }
    }
  }

  const handleUpdateShowNotes = async () => {
    if (window.confirm('This will update Andy Braner episode with rich show notes from the original site. Continue?')) {
      try {
        const result = await updateAndyBranerShowNotes()
        if (result.success) {
          alert('✅ Successfully updated Andy Braner show notes!')
          fetchEpisodes() // Refresh the list
        } else {
          alert(`❌ Error: ${result.error}`)
        }
      } catch (error) {
        console.error('Error updating show notes:', error)
        alert('Error updating show notes. Check console for details.')
      }
    }
  }

  const handleUpdateAllShowNotes = async () => {
    if (window.confirm('This will update ALL Season 1 episodes with comprehensive show notes. This may take a moment. Continue?')) {
      try {
        const result = await updateAllSeason1ShowNotes()
        if (result.success) {
          alert(`✅ Successfully updated ${result.summary.successful} episodes!`)
          fetchEpisodes() // Refresh the list
        } else {
          const errorMsg = result.error || 'Some episodes failed to update'
          alert(`❌ Error: ${errorMsg}`)
          console.log('Update results:', result.results)
        }
      } catch (error) {
        console.error('Error updating show notes:', error)
        alert('Error updating show notes. Check console for details.')
      }
    }
  }

  const handleCheckAndyEpisode = async () => {
    try {
      const episodesRef = collection(db, 'podcast-episodes')
      const q = query(episodesRef, where('episodeNumber', '==', 3), where('season', '==', 1))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const episodeDoc = querySnapshot.docs[0]
        const episodeData = episodeDoc.data()
        console.log('Andy episode in database:', episodeData)
        console.log('Show notes field:', episodeData.showNotes)
        console.log('Show notes length:', episodeData.showNotes?.length || 'undefined')
        alert(`Andy episode found. Show notes length: ${episodeData.showNotes?.length || 'undefined'}`)
      } else {
        alert('Andy episode not found!')
      }
    } catch (error) {
      console.error('Error checking Andy episode:', error)
      alert('Error checking Andy episode')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleEditEpisode = (episode) => {
    setEditingEpisode(episode)
    setShowForm(true)
  }

  const handleDeleteEpisode = async (episodeId) => {
    if (window.confirm('Are you sure you want to delete this episode?')) {
      try {
        await deleteDoc(doc(db, 'podcast-episodes', episodeId))
        setEpisodes(episodes.filter(ep => ep.id !== episodeId))
      } catch (error) {
        console.error('Error deleting episode:', error)
        alert('Error deleting episode')
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingEpisode(null)
    fetchEpisodes() // Refresh episodes list
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <Helmet>
        <title>Admin Dashboard | BEGIN the work</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="admin-dashboard">
        <header className="admin-header">
          <div className="admin-header-content">
            <h1>Podcast Admin Dashboard</h1>
            <div className="admin-header-actions">
              <span className="admin-user">Welcome, {user?.displayName || user?.email}</span>
              <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                Add New Episode
              </button>
                     <button className="btn btn-info" onClick={handleAddSlugs}>
                       Add URL Slugs
                     </button>
                     <button className="btn btn-warning" onClick={handleUpdateShowNotes}>
                       Update Andy Show Notes
                     </button>
                     <button className="btn btn-success" onClick={handleUpdateAllShowNotes}>
                       Update All Season 1 Show Notes
                     </button>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="admin-main">
          <div className="episodes-list">
            <h2>Episodes ({episodes.length})</h2>
            
            {episodes.length === 0 ? (
              <div className="no-episodes">
                <p>No episodes found. Add your first episode!</p>
              </div>
            ) : (
              <div className="seasons-container">
                {/* Season 1 Section */}
                {episodes.filter(ep => ep.season === 1).length > 0 && (
                  <div className="season-section">
                    <h3 className="season-title">Season 1 ({episodes.filter(ep => ep.season === 1).length} episodes)</h3>
                    <div className="episodes-grid">
                      {episodes
                        .filter(ep => ep.season === 1)
                        .map((episode) => (
                          <div key={episode.id} className="episode-card">
                            <div className="episode-image">
                              {episode.imageUrl ? (
                                <img src={episode.imageUrl} alt={episode.title} />
                              ) : (
                                <div className="no-image">No Image</div>
                              )}
                            </div>
                            
                            <div className="episode-content">
                              <div className="episode-meta">
                                <span className="season-badge">Season {episode.season}</span>
                                <span className="episode-number">Ep. {episode.episodeNumber}</span>
                              </div>
                              
                              <h3>{episode.title}</h3>
                              <p className="episode-description">{episode.description}</p>
                              
                              <div className="episode-actions">
                                <button 
                                  className="btn btn-sm btn-primary episode-action-btn"
                                  onClick={() => handleEditEpisode(episode)}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger episode-action-btn"
                                  onClick={() => handleDeleteEpisode(episode.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Season 2 Section */}
                {episodes.filter(ep => ep.season === 2).length > 0 && (
                  <div className="season-section">
                    <h3 className="season-title">Season 2 ({episodes.filter(ep => ep.season === 2).length} episodes)</h3>
                    <div className="episodes-grid">
                      {episodes
                        .filter(ep => ep.season === 2)
                        .map((episode) => (
                          <div key={episode.id} className="episode-card">
                            <div className="episode-image">
                              {episode.imageUrl ? (
                                <img src={episode.imageUrl} alt={episode.title} />
                              ) : (
                                <div className="no-image">No Image</div>
                              )}
                            </div>
                            
                            <div className="episode-content">
                              <div className="episode-meta">
                                <span className="season-badge">Season {episode.season}</span>
                                <span className="episode-number">Ep. {episode.episodeNumber}</span>
                              </div>
                              
                              <h3>{episode.title}</h3>
                              <p className="episode-description">{episode.description}</p>
                              
                              <div className="episode-actions">
                                <button 
                                  className="btn btn-sm btn-primary episode-action-btn"
                                  onClick={() => handleEditEpisode(episode)}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger episode-action-btn"
                                  onClick={() => handleDeleteEpisode(episode.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Season 3+ Section */}
                {episodes.filter(ep => ep.season >= 3).length > 0 && (
                  <div className="season-section">
                    <h3 className="season-title">Season 3+ ({episodes.filter(ep => ep.season >= 3).length} episodes)</h3>
                    <div className="episodes-grid">
                      {episodes
                        .filter(ep => ep.season >= 3)
                        .map((episode) => (
                          <div key={episode.id} className="episode-card">
                            <div className="episode-image">
                              {episode.imageUrl ? (
                                <img src={episode.imageUrl} alt={episode.title} />
                              ) : (
                                <div className="no-image">No Image</div>
                              )}
                            </div>
                            
                            <div className="episode-content">
                              <div className="episode-meta">
                                <span className="season-badge">Season {episode.season}</span>
                                <span className="episode-number">Ep. {episode.episodeNumber}</span>
                              </div>
                              
                              <h3>{episode.title}</h3>
                              <p className="episode-description">{episode.description}</p>
                              
                              <div className="episode-actions">
                                <button 
                                  className="btn btn-sm btn-primary episode-action-btn"
                                  onClick={() => handleEditEpisode(episode)}
                                >
                                  Edit
                                </button>
                                <button 
                                  className="btn btn-sm btn-danger episode-action-btn"
                                  onClick={() => handleDeleteEpisode(episode.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {showForm && (
          <EpisodeForm 
            episode={editingEpisode}
            onClose={handleFormClose}
          />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
