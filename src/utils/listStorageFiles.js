import { listAll, ref } from 'firebase/storage'
import { storage } from '../firebase/config.js'

// Function to list all files in Firebase Storage
export const listStorageFiles = async () => {
  try {
    console.log('🔍 Listing Firebase Storage files...')
    
    // List files in the root
    const listRef = ref(storage)
    const result = await listAll(listRef)
    
    console.log('📁 Root level items:')
    result.prefixes.forEach((folderRef) => {
      console.log(`📂 Folder: ${folderRef.name}`)
    })
    
    result.items.forEach((itemRef) => {
      console.log(`📄 File: ${itemRef.name}`)
    })
    
    // If there's a Podcast folder, list its contents
    const podcastRef = result.prefixes.find(prefix => prefix.name === 'Podcast')
    if (podcastRef) {
      console.log('\n🎙️ Podcast folder contents:')
      const podcastResult = await listAll(podcastRef)
      
      podcastResult.prefixes.forEach((folderRef) => {
        console.log(`📂 Season folder: ${folderRef.name}`)
      })
      
      podcastResult.items.forEach((itemRef) => {
        console.log(`📄 File: ${itemRef.name}`)
      })
      
      // List all season folders
      for (const seasonRef of podcastResult.prefixes) {
        console.log(`\n🎵 ${seasonRef.name} folder contents:`)
        const seasonResult = await listAll(seasonRef)
        
        seasonResult.items.forEach((itemRef) => {
          console.log(`📄 File: ${itemRef.name}`)
        })
        
        // If there are subfolders, list them too
        if (seasonResult.prefixes.length > 0) {
          seasonResult.prefixes.forEach((subFolderRef) => {
            console.log(`📂 Subfolder: ${subFolderRef.name}`)
          })
        }
      }
    }
    
    return result
  } catch (error) {
    console.error('❌ Error listing storage files:', error)
    throw error
  }
}

// Function to check if specific files exist
export const checkSpecificFiles = async () => {
  const filesToCheck = [
    'Podcast/Season-1/8_Heady-Coleman/ep8-heady-coleman-sans-intro.wav',
    'Podcast/Season-1/8_Heady-Coleman/heady-1.jpg',
    'Podcast/Season-1/7_Jeremy_Gardner/ep7-jeremy-gardner.wav',
    'Podcast/Season-1/7_Jeremy_Gardner/jeremy-gardner.jpg',
    'Podcast/Season-1/6_Life-is-not-a-marathon/ep6-lesson-1.wav',
    'Podcast/Season-1/6_Life-is-not-a-marathon/sam-track.jpg',
    'Podcast/Season-1/5_Evan_DeWalt/evan_dewalt_final.wav',
    'Podcast/Season-1/5_Evan_DeWalt/Evan-DeWalt.jpg',
    'Podcast/Season-1/4_Studio_Dewalt/Studio_DeWalt_Final.wav',
    'Podcast/Season-1/4_Studio_Dewalt/studio-dewalt-logo.jpg',
    'Podcast/Season-1/3_Andy_Braner/Ep3_Andy_Braner.wav',
    'Podcast/Season-1/3_Andy_Braner/andy-sam-dc.jpeg',
    'Podcast/Season-1/2_Episode_Todd_Smith/2-full-episode-todd-smith.wav',
    'Podcast/Season-1/2_Episode_Todd_Smith/todd-smith-2.jpg',
    'Podcast/Season-1/1_Episode_Ben_Nockels/Episode_2_Ben_and_Sam.wav',
    'Podcast/Season-1/1_Episode_Ben_Nockels/ben-nockels.jpg',
    'Podcast/Season-1/0_Episode_BEGIN_Intro/intro_full_episode.wav',
    'Podcast/Season-1/0_Episode_BEGIN_Intro/episode-1.jpg'
  ]
  
  console.log('🔍 Checking specific files...')
  
  for (const filePath of filesToCheck) {
    try {
      const fileRef = ref(storage, filePath)
      const listRef = ref(storage, filePath.split('/').slice(0, -1).join('/'))
      const result = await listAll(listRef)
      
      const fileName = filePath.split('/').pop()
      const exists = result.items.some(item => item.name === fileName)
      
      console.log(`${exists ? '✅' : '❌'} ${filePath}`)
    } catch (error) {
      console.log(`❌ ${filePath} - Error: ${error.message}`)
    }
  }
}
