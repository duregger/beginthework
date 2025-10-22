import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/config.js'

// Get Firebase Storage URL for podcast files
export const getPodcastFileUrl = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath)
    const url = await getDownloadURL(fileRef)
    return url
  } catch (error) {
    console.error('Error getting file URL:', error)
    // Return fallback URL if Firebase fails
    return `https://firebasestorage.googleapis.com/v0/b/corded-academy-391318.appspot.com/o/${encodeURIComponent(filePath)}?alt=media`
  }
}
