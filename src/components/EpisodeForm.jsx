import React, { useState } from 'react'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import './EpisodeForm.css'

const EpisodeForm = ({ episode, onClose }) => {
  const [formData, setFormData] = useState({
    title: episode?.title || '',
    description: episode?.description || '',
    about: episode?.about || '',
    showNotes: episode?.showNotes || '',
    season: episode?.season || 1,
    episodeNumber: episode?.episodeNumber || 1,
    publishedDate: episode?.publishedDate || new Date().toISOString().split('T')[0],
    type: episode?.type || 'episode',
    youtubeUrl: episode?.youtubeUrl || ''
  })

  const [audioFile, setAudioFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [audioUrl, setAudioUrl] = useState(episode?.audioUrl || '')
  const [imageUrl, setImageUrl] = useState(episode?.imageUrl || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'season' || name === 'episodeNumber' ? parseInt(value) : value
    }))
  }

  // Generate URL slug from episode number and title
  const generateSlug = (episodeNumber, title) => {
    const cleanTitle = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
    
    return `${episodeNumber}-${cleanTitle}`
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    console.log('File selected:', file, 'Type:', type)
    if (file) {
      console.log('File details:', {
        name: file.name,
        size: file.size,
        type: file.type
      })
    }
    if (type === 'audio') {
      setAudioFile(file)
      // Clear URL when file is selected
      if (file) setAudioUrl('')
    } else {
      setImageFile(file)
      // Clear URL when file is selected
      if (file) setImageUrl('')
    }
  }

  const handleFileClick = (e, type) => {
    console.log('File input clicked:', type)
    e.preventDefault()
    const fileInput = document.getElementById(type === 'audio' ? 'audioFile' : 'imageFile')
    if (fileInput) {
      fileInput.click()
    }
  }

  const handleUrlChange = (e, type) => {
    const value = e.target.value
    if (type === 'audio') {
      setAudioUrl(value)
      // Clear file when URL is entered
      if (value) setAudioFile(null)
    } else {
      setImageUrl(value)
      // Clear file when URL is entered
      if (value) setImageFile(null)
    }
  }

  const uploadFile = async (file, path) => {
    const fileRef = ref(storage, path)
    await uploadBytes(fileRef, file)
    return await getDownloadURL(fileRef)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let finalAudioUrl = episode?.audioUrl || null
      let finalImageUrl = episode?.imageUrl || null

      // Handle audio - either upload file or use URL
      if (audioFile) {
        const episodeFolder = `${formData.episodeNumber}_${formData.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}`
        const audioPath = `Podcast/Season-${formData.season}/${episodeFolder}/${audioFile.name}`
        finalAudioUrl = await uploadFile(audioFile, audioPath)
      } else if (audioUrl.trim()) {
        finalAudioUrl = audioUrl.trim()
      }

      // Handle image - either upload file or use URL
      if (imageFile) {
        const episodeFolder = `${formData.episodeNumber}_${formData.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_')}`
        const imagePath = `Podcast/Season-${formData.season}/${episodeFolder}/${imageFile.name}`
        finalImageUrl = await uploadFile(imageFile, imagePath)
      } else if (imageUrl.trim()) {
        finalImageUrl = imageUrl.trim()
      }

      const episodeData = {
        ...formData,
        slug: generateSlug(formData.episodeNumber, formData.title),
        audioUrl: finalAudioUrl,
        imageUrl: finalImageUrl,
        createdAt: episode?.createdAt || new Date(),
        updatedAt: new Date()
      }

      if (episode) {
        // Update existing episode
        await updateDoc(doc(db, 'podcast-episodes', episode.id), episodeData)
      } else {
        // Add new episode
        await addDoc(collection(db, 'podcast-episodes'), episodeData)
      }

      onClose()
    } catch (error) {
      console.error('Error saving episode:', error)
      setError('Error saving episode. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="episode-form-overlay">
      <div className="episode-form-modal">
        <div className="episode-form-header">
          <h2>{episode ? 'Edit Episode' : 'Add New Episode'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="episode-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-row full-width">
            <div className="form-group">
              <label htmlFor="title">Episode Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row full-width">
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>
          </div>

          <div className="form-row full-width">
            <div className="form-group">
              <label htmlFor="about">About</label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows="4"
              />
            </div>
          </div>

          <div className="form-row full-width">
            <div className="form-group">
              <label htmlFor="showNotes">Show Notes</label>
              <textarea
                id="showNotes"
                name="showNotes"
                value={formData.showNotes}
                onChange={handleInputChange}
                rows="6"
                placeholder="Detailed show notes, timestamps, links, etc."
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="season">Season *</label>
              <select
                id="season"
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                required
              >
                <option value={1}>Season 1</option>
                <option value={2}>Season 2</option>
                <option value={3}>Season 3</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="episodeNumber">Episode Number *</label>
              <input
                type="number"
                id="episodeNumber"
                name="episodeNumber"
                value={formData.episodeNumber}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="publishedDate">Published Date *</label>
              <input
                type="date"
                id="publishedDate"
                name="publishedDate"
                value={formData.publishedDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Episode Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="episode">Episode</option>
                <option value="intro">Intro</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
          </div>

          <div className="form-row full-width">
            <div className="form-group">
              <label htmlFor="youtubeUrl">YouTube Video URL</label>
              <input
                type="url"
                id="youtubeUrl"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className="url-input"
              />
              <p className="field-help">Optional: Add YouTube video link for Season 2 episodes</p>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="audioFile">Audio File {!episode?.audioUrl && '*'}</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="audioFile"
                  accept="audio/*"
                  onChange={(e) => handleFileChange(e, 'audio')}
                  required={!episode?.audioUrl && !audioUrl.trim()}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => {
                    const fileInput = document.getElementById('audioFile');
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  {audioFile ? `Selected: ${audioFile.name}` : 'Choose Audio File'}
                </button>
              </div>
              {episode?.audioUrl && !audioFile && (
                <p className="file-info">Current: {episode.audioUrl.split('/').pop()}</p>
              )}
              <div className="or-divider"></div>
              <input
                type="url"
                placeholder="Enter audio URL (e.g., https://example.com/audio.mp3)"
                value={audioUrl}
                onChange={(e) => handleUrlChange(e, 'audio')}
                required={!episode?.audioUrl && !audioFile}
                className="url-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageFile">Episode Image</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image')}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => {
                    const fileInput = document.getElementById('imageFile');
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  {imageFile ? `Selected: ${imageFile.name}` : 'Choose Image File'}
                </button>
              </div>
              {episode?.imageUrl && !imageFile && (
                <p className="file-info">Current: {episode.imageUrl.split('/').pop()}</p>
              )}
              <div className="or-divider"></div>
              <input
                type="url"
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e, 'image')}
                className="url-input"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (episode ? 'Update Episode' : 'Add Episode')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EpisodeForm
