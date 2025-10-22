import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase/config.js'

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

export const addSlugsToEpisodes = async () => {
  try {
    console.log('Starting slug migration...')
    
    // Check if user is authenticated
    const user = auth.currentUser
    if (!user) {
      throw new Error('User must be authenticated to perform migration')
    }
    
    // Check if user has the correct email domain
    if (!user.email || !user.email.endsWith('@beginthework.com')) {
      throw new Error('User must have @beginthework.com email to perform migration')
    }
    
    console.log(`Authenticated as: ${user.email}`)
    
    // Get all episodes
    const episodesRef = collection(db, 'podcast-episodes')
    const querySnapshot = await getDocs(episodesRef)
    
    let updatedCount = 0
    
    for (const episodeDoc of querySnapshot.docs) {
      const episodeData = episodeDoc.data()
      
      // Skip if slug already exists
      if (episodeData.slug) {
        console.log(`Skipping ${episodeData.title} - already has slug`)
        continue
      }
      
      // Generate slug
      const slug = generateSlug(episodeData.episodeNumber, episodeData.title)
      
      // Update the episode with the slug
      await updateDoc(doc(db, 'podcast-episodes', episodeDoc.id), {
        slug: slug,
        updatedAt: new Date()
      })
      
      console.log(`Updated: ${episodeData.title} -> ${slug}`)
      updatedCount++
    }
    
    console.log(`✅ Slug migration completed! Updated ${updatedCount} episodes.`)
    return { success: true, count: updatedCount }
  } catch (error) {
    console.error('❌ Slug migration failed:', error)
    return { success: false, error: error.message }
  }
}
