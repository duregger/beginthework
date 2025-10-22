import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, orderBy, where } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './config'

// Podcast episodes collection
const EPISODES_COLLECTION = 'podcast-episodes'

// Add a new podcast episode
export const addPodcastEpisode = async (episodeData) => {
  try {
    const docRef = await addDoc(collection(db, EPISODES_COLLECTION), {
      ...episodeData,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding podcast episode:', error)
    throw error
  }
}

// Get all podcast episodes
export const getPodcastEpisodes = async () => {
  try {
    const episodesRef = collection(db, EPISODES_COLLECTION)
    const q = query(episodesRef, orderBy('publishedDate', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting podcast episodes:', error)
    throw error
  }
}

// Get a single podcast episode
export const getPodcastEpisode = async (episodeId) => {
  try {
    const episodeRef = doc(db, EPISODES_COLLECTION, episodeId)
    const episodeSnap = await getDoc(episodeRef)
    
    if (episodeSnap.exists()) {
      return {
        id: episodeSnap.id,
        ...episodeSnap.data()
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error getting podcast episode:', error)
    throw error
  }
}

// Update a podcast episode
export const updatePodcastEpisode = async (episodeId, updateData) => {
  try {
    const episodeRef = doc(db, EPISODES_COLLECTION, episodeId)
    await updateDoc(episodeRef, {
      ...updateData,
      updatedAt: new Date()
    })
  } catch (error) {
    console.error('Error updating podcast episode:', error)
    throw error
  }
}

// Delete a podcast episode
export const deletePodcastEpisode = async (episodeId) => {
  try {
    const episodeRef = doc(db, EPISODES_COLLECTION, episodeId)
    await deleteDoc(episodeRef)
  } catch (error) {
    console.error('Error deleting podcast episode:', error)
    throw error
  }
}

// Upload podcast audio file
export const uploadPodcastAudio = async (file, episodeId) => {
  try {
    const audioRef = ref(storage, `podcast-episodes/${episodeId}/audio/${file.name}`)
    const snapshot = await uploadBytes(audioRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading podcast audio:', error)
    throw error
  }
}

// Upload podcast image
export const uploadPodcastImage = async (file, episodeId) => {
  try {
    const imageRef = ref(storage, `podcast-episodes/${episodeId}/images/${file.name}`)
    const snapshot = await uploadBytes(imageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading podcast image:', error)
    throw error
  }
}

// Delete podcast audio file
export const deletePodcastAudio = async (audioUrl) => {
  try {
    const audioRef = ref(storage, audioUrl)
    await deleteObject(audioRef)
  } catch (error) {
    console.error('Error deleting podcast audio:', error)
    throw error
  }
}

// Delete podcast image
export const deletePodcastImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl)
    await deleteObject(imageRef)
  } catch (error) {
    console.error('Error deleting podcast image:', error)
    throw error
  }
}

// Get episodes by season
export const getEpisodesBySeason = async (season) => {
  try {
    const episodesRef = collection(db, EPISODES_COLLECTION)
    const q = query(episodesRef, where('season', '==', season), orderBy('episodeNumber', 'asc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting episodes by season:', error)
    throw error
  }
}
