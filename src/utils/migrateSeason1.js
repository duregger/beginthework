import { collection, addDoc } from 'firebase/firestore'
import { db, auth } from '../firebase/config.js'
import { getPodcastFileUrl } from './podcastFiles.js'

// Season 1 episodes data from the original HTML
const season1Episodes = [
  {
    title: 'Go Win! with Heady Coleman',
    description: 'Heady Coleman, is everywhere. He greets, he speaks, he motivates. He gets people to figure out how to Go Win in their life and current circumstance. You can find him interviewing a variety of voices from his podcasting studio in Guthrie, Oklahoma; pastoring at North Church, organizing events, giving motivation talks, and greeting people at events around Oklahoma.',
    summary: 'Heady Coleman, is everywhere. He greets, he speaks, he motivates. He gets people to figure out how to Go Win in their life and current circumstance.',
    season: 1,
    episodeNumber: 8,
    publishedDate: '2020-02-01',
    type: 'episode',
    audioPath: 'Podcast/Season-1/8_Heady-Coleman/ep8-heady-coleman-sans-intro.wav',
    imagePath: 'Podcast/Season-1/8_Heady-Coleman/heady-1.jpg',
    fallbackAudioUrl: 'http://beginthework.com/feed/2020/february/ep8/ep8-heady-coleman-sans-intro.wav',
    fallbackImageUrl: 'http://www.beginthework.com/feed/2020/february/ep8/heady-1.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'A Conversation with Jeremy Gardner',
    description: 'Jeremy Gardner, is the founder of Gardner Studio and Small Projects, LLC. He is interested in the renewal of spaces and places and is passionate about building a studio which brings together those that do, with those that draw.',
    summary: 'Jeremy Gardner, is the founder of Gardner Studio and Small Projects, LLC. He is interested in the renewal of spaces and places and is passionate about building a studio which brings together those that do, with those that draw.',
    season: 1,
    episodeNumber: 7,
    publishedDate: '2020-01-01',
    type: 'episode',
    audioPath: 'Podcast/Season-1/7_Jeremy_Gardner/ep7-jeremy-gardner.wav',
    imagePath: 'Podcast/Season-1/7_Jeremy_Gardner/jeremy-gardner.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Life is not a marathon...',
    description: 'For this new year, a time of new beginnings, Sam reads the first chapter of his work in progress -- Begin the work. This excerpt introduces the idea of work not as a performance or a race, but as training for a performance or race -- life is not a marathon, life is training for a marathon.',
    summary: 'For this new year, a time of new beginnings, Sam reads the first chapter of his work in progress -- Begin the work. This excerpt introduces the idea of work not as a performance or a race, but as training for a performance or race -- life is not a marathon, life is training for a marathon.',
    season: 1,
    episodeNumber: 6,
    publishedDate: '2020-01-10',
    type: 'episode',
    audioPath: 'Podcast/Season-1/6_Life-is-not-a-marathon/ep6-lesson-1.wav',
    imagePath: 'Podcast/Season-1/6_Life-is-not-a-marathon/sam-track.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'So, you want to build a brand?',
    description: 'In this conversation Sam and Evan delve into design and branding as it relates to constructing a brand framework, as opposed to just a logo. Evan expands on his philosophy of branding design, introduced in the last podcast conversation with Studio DeWalt, an Oklahoma City based design boutique. Currently, Evan is the Creative Director for @rhumbix and was the former Creative Director of EvoShield, which if you watch postseason baseball is getting quite the screen time as the protective pad is attached to every other batters elbow.',
    summary: 'In this conversation Sam and Evan delve into design and branding as it relates to constructing a brand framework, as opposed to just a logo.',
    season: 1,
    episodeNumber: 5,
    publishedDate: '2019-10-01',
    type: 'episode',
    audioPath: 'Podcast/Season-1/5_Evan_DeWalt/evan_dewalt_final.wav',
    imagePath: 'Podcast/Season-1/5_Evan_DeWalt/Evan-DeWalt.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'A Conversation with Studio DeWalt',
    description: 'Studio DeWalt, an Oklahoma City based design boutique espouses thoughtful design and brand strategy as the main deliverables of their service. Married as well as business partners, Julie and Evan DeWalt have put Studio DeWalt on the side, as they each have joined other companies over the last year -- Julie as the Design Director at @madebyswitch, and Evan as the Creative Director for @rhumbix. As a married couple Julie and Evan are the most delightful parents to two beautiful kiddos, and as a creative duo, they are a tour de force of talent.',
    summary: 'In this conversation, Sam, Evan, and Julie delve into design principles and practices, as more than any other profession it seems designers flow through the Begin; Begun; Begin, Again process on a daily basis iterating on design projects for businesses of varying sizes and within a multitude of industries.',
    season: 1,
    episodeNumber: 4,
    publishedDate: '2019-09-01',
    type: 'episode',
    audioPath: 'Podcast/Season-1/4_Studio_Dewalt/Studio_DeWalt_Final.wav',
    imagePath: 'Podcast/Season-1/4_Studio_Dewalt/studio-dewalt-logo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'A Conversation with Andy Braner',
    description: 'Andy currently resides in Washington D.C. and has spent the last few years focused on helping people come together in business, education, and social work to achieve a common understanding of the human condition. He has spent time representing the United States overseeing foreign elections and continues to consult on international affairs.',
    summary: 'Sam and Andy go back 14+ years, as Sam worked as the Waterfront Coordinator and Programs Director for Andy who was the Executive Director of Kanakuck Colorado (which became Camp Kivu), in 2005-2007. In this episode, Andy and Sam look back on their time in youth ministry and connect the dots from #camplife to #govlife.',
    season: 1,
    episodeNumber: 3,
    publishedDate: '2019-08-01',
    type: 'episode',
    audioPath: 'Podcast/Season-1/3_Andy_Braner/Ep3_Andy_Braner.wav',
    imagePath: 'Podcast/Season-1/3_Andy_Braner/andy-sam-dc.jpeg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'A Conversation with Todd Smith',
    description: 'Todd Smith, formerly the President and Chief Marketing Officer (CMO) of SONIC Drive-in, currently lives in Salt Lake City, Utah with his wife and five kids. Todd is the Chief Creative Officer (CCO) of Cafe Rio and franchisee of 4 CoreLife Eateries across the Salt Lake Valley. Todd has over 13 years of restaurant experience, with executive experience at Yum! Brands, Wendy\'s and Sonic Drive-in. Todd graduated from BYU and got his masters from Northwestern.',
    summary: 'In this episode, Todd and I look back on our time at SONIC Drive-In, where Todd led the digital innovation vision as CMO and later President of SONIC. The focus in the first portion of the conversation is how as an executive Todd began the process of preparing room for digital innovation.',
    season: 1,
    episodeNumber: 2,
    publishedDate: '2019-08-15',
    type: 'episode',
    audioPath: 'Podcast/Season-1/2_Episode_Todd_Smith/2-full-episode-todd-smith.wav',
    imagePath: 'Podcast/Season-1/2_Episode_Todd_Smith/todd-smith-2.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'A Conversation with Ben Nockels',
    description: 'Ben Nockels, is the founder of Commonplace Books, Kitchen at Commonplace, and the Market at Commonplace. He is a father of three and dedicated to one-on-one conversations about life, art, books and food!',
    summary: 'In our inaugural interview Sam sits down with Ben Nockels of Commonplace Books to discuss Commonplace\'s origin story and what\'s next for the brand in a fully packed 90 minute conversation. Sam and Ben\'s friendship goes back 11 years, but this is actually one of the first times they have sat down to chat in a formal one-on-one conversation.',
    season: 1,
    episodeNumber: 1,
    publishedDate: '2019-08-10',
    type: 'episode',
    audioPath: 'Podcast/Season-1/1_Episode_Ben_Nockels/Episode_2_Ben_and_Sam.wav',
    imagePath: 'Podcast/Season-1/1_Episode_Ben_Nockels/ben-nockels.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'An introduction to BEGIN the Podcast',
    description: 'Yes, I seriously did record this three times... I\'m a writer, not a talker. The best place to find my writings in an organized fashion is on Medium, I mainly publish essays or prose covering: digital innovation, creativity, culture, and theology.',
    summary: 'Introductory podcast... How do we begin the work? Sam DuRegger sets up Begin the Podcast series.',
    season: 1,
    episodeNumber: 0,
    publishedDate: '2019-07-30',
    type: 'intro',
    audioPath: 'Podcast/Season-1/0_Episode_BEGIN_Intro/intro_full_episode.wav',
    imagePath: 'Podcast/Season-1/0_Episode_BEGIN_Intro/episode-1.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// Function to migrate episodes to Firebase
export const migrateSeason1Episodes = async () => {
  try {
    console.log('Starting migration of Season 1 episodes...')
    
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
    
    let successCount = 0
    for (const episode of season1Episodes) {
      try {
        // Get Firebase Storage URLs for audio and image
        let audioUrl = null
        let imageUrl = null
        
        if (episode.audioPath) {
          try {
            audioUrl = await getPodcastFileUrl(episode.audioPath)
          } catch (error) {
            console.log(`Audio file not found in Firebase Storage: ${episode.audioPath}`)
            // Use fallback URL from original site
            audioUrl = episode.fallbackAudioUrl || episode.audioPath.replace('Podcast/Season-1/', 'http://beginthework.com/feed/2019/')
          }
        }
        if (episode.imagePath) {
          try {
            imageUrl = await getPodcastFileUrl(episode.imagePath)
          } catch (error) {
            console.log(`Image file not found in Firebase Storage: ${episode.imagePath}`)
            // Use fallback URL from original site
            imageUrl = episode.fallbackImageUrl || episode.imagePath.replace('Podcast/Season-1/', 'http://www.beginthework.com/feed/2019/')
          }
        }
        
        // Add the episode with Firebase URLs
        const episodeData = {
          ...episode,
          audioUrl,
          imageUrl
        }
        
        await addDoc(collection(db, 'podcast-episodes'), episodeData)
        console.log(`Added: ${episode.title}`)
        successCount++
      } catch (episodeError) {
        console.error(`Failed to add ${episode.title}:`, episodeError)
        // Continue with other episodes even if one fails
      }
    }
    
    if (successCount === 0) {
      throw new Error('No episodes were successfully added')
    }
    
    console.log('✅ Migration completed successfully!')
    return { success: true, count: successCount, total: season1Episodes.length }
  } catch (error) {
    console.error('❌ Migration failed:', error)
    return { success: false, error: error.message }
  }
}

// Export the episodes data for reference
export { season1Episodes }
