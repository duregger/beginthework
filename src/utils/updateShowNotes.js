import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore'
import { db, auth } from '../firebase/config.js'

// Show notes for Andy Braner (Episode 3) - Using original working URLs
const andyBranerShowNotes = `<strong>Camp Kivu</strong><br/>
<img src="http://beginthework.com/feed/2019/august/ep3/k-colorado.jpg" width="100%" alt="Camp Kivu Colorado"><br/><br/>
There is no other way to describe Vallecito Valley, you just have to see it. Camp Kivu was located 5 miles south of Vallecito Reservoir along the Los Pinos River which runs southeast into Bayfield, Colorado. North of camp was my favorite fly fishing excursion, Vallecito Creek, which runs up through a couple box canyons into the San Juan Mountains which run north and east of Durango, Colorado.

<hr>
<strong>Gallery of Camp Photos</strong><br/>
This is as incriminating as it can get... I'm linking to all three summer photo albums for you to peruse. I have great memories from my time in Colorado, summers of adventure and friendships smashed between the isolation found within academic study. I was Waterfront Coordinator the first couple summers, keeping campers safe while they enjoyed the frigid waters of Vallecito reservoir, and then later as the Director of Programs I ensured the campers were entertained throughout their day, no short order, when you're talking about 150 teenagers 1000 miles from home. The collaborative nature of our leadership team allowed us to build the experiences and facilitate the associated programs with a great sense of fun and purpose. I grew so much as a leader during this time, figuring out there are times to lead and times to follow. Understanding and seeing moments to step back and let others in the spotlight and moments to step up and engage the crowd.<br/><br/>
<a href="https://www.flickr.com/photos/sam_duregger/albums/455946" target="_blank">Summer of 2005</a><br/>
<a href="https://www.flickr.com/photos/sam_duregger/albums/72157594149163805" target="_blank">Summer of 2006</a><br/>
<a href="https://www.flickr.com/photos/sam_duregger/albums/72157601549278772" target="_blank">Summer of 2007</a>

<hr>
<strong>Cornrows & a mullet</strong><br/>
The time I went from cornrows to a mullet:

<div style="display: flex; gap: 10px; margin: 20px 0;">
<img src="http://beginthework.com/feed/2019/august/ep3/cornrows-1.jpg" width="30%" alt="Cornrows 1">
<img src="http://beginthework.com/feed/2019/august/ep3/cornrows-2.jpg" width="30%" alt="Cornrows 2">
<img src="http://beginthework.com/feed/2019/august/ep3/cornrows-3.jpg" width="30%" alt="Cornrows 3">
</div>

<div style="display: flex; gap: 10px; margin: 20px 0;">
<img src="http://beginthework.com/feed/2019/august/ep3/long-hair-1.jpg" width="30%" alt="Long Hair">
<img src="http://beginthework.com/feed/2019/august/ep3/mullet-1.jpg" width="30%" alt="Mullet 1">
<img src="http://beginthework.com/feed/2019/august/ep3/mullet-2.jpg" width="30%" alt="Mullet 2">
</div>

<hr>
<strong>Andy Braner - An Egyptian Celebrity</strong><br/>
One of my absolute favorite stories of Andy is how he became a social media celebrity in Egypt. Listen to the podcast to hear the story in all it's glory. And then come back here to see why these articles and posts are so dang funny.<br/><br/>

<a href="https://theintercept.com/2018/03/28/egyptian-lawmaker-called-2011-revolution-c-plot-guides-u-s-election-observers/">Egyptian Lawmaker Who Called 2011 Revolution a CIA Plot Guides U.S. Election Observers</a><br/><br/>
<a href="https://www.egypttoday.com/Article/1/46367/Members-of-U-S-delegation-dance-with-voters-in-Menoufia">Members of U.S. delegation dance with voters in Menoufia</a><br/><br/>
As Andy talks through this social media blunder, he says something that will stick with me for a while, it was ultimately naive of him to trust the festivities and join in the fun, because the perception of him dancing was used to twist the truth of the event. In Egypt the culture is such that you eat what you've been offered, drink what has been given and even dance when you've been invited to dance. So, his following of the norms was actually a good tactic for building trusting relationships, but not so much for validating votes.

<hr>
<strong>Jordan B. Peterson</strong><br/>
Andy brings up <a href="https://www.thedailybeast.com/jordan-peterson-goes-to-washington-dc-to-save-congress-from-itself" target="_blank">Jordan Peterson's dinner and conversation on Capitol Hill</a>, as a good start on bridging the communication gap between polarized parties. Jordan Peterson has been a polarizing voice in his own right, as he has spoken out on lightening rod topics such as feminism, political correctness and the Bible.<br/><br/>

Find Jordan Peterson via: <a href="https://www.jordanbpeterson.com/" target="_blank">Web</a> | <a href="https://twitter.com/jordanbpeterson?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">Twitter</a> | <a href="https://www.jordanbpeterson.com/maps-of-meaning/" target="_blank">Books</a> | <a href="https://podcasts.apple.com/ca/podcast/jordan-b-peterson-podcast/id1184022695?mt=2" target="_blank">Podcast</a> | <a href="https://www.youtube.com/user/JordanPetersonVideosYoutube" target="_blank">YouTube</a>

<hr>
<strong>Find Andy Braner</strong><br/>
Twitter: <a href="https://twitter.com/braner" target="_blank">@abraner</a><br/>
Web: <a href="https://andybraner.com/" target="_blank">andybraner.com</a><br/><br/>

Buy his books:<br/>
<a href="https://www.amazon.com/No-Fear-Love-Loving-Others/dp/0801017289/ref=sr_1_2?qid=1566791944&refinements=p_27%3AAndy+Braner&s=books&sr=1-2&text=Andy+Braner" target="_blank">No Fear in Love</a><br/>
<a href="https://www.amazon.com/Alone-Finding-Connection-Lonely-World/dp/1617479926/ref=sr_1_3?qid=1566791944&refinements=p_27%3AAndy+Braner&s=books&sr=1-3&text=Andy+Braner" target="_blank">Alone</a><br/>
<a href="https://www.amazon.com/Expose-Teen-Sex-Dating-Really/dp/1615219234/ref=sr_1_4?qid=1566791944&refinements=p_27%3AAndy+Braner&s=books&sr=1-4&text=Andy+Braner" target="_blank">An Expose on Teen Sex and Dating</a><br/>
<a href="https://www.amazon.com/gp/product/B002AKPFZ8/ref=dbs_a_def_rwt_bibl_vppi_i3" target="_blank">Duplicate This</a><br/>
<a href="https://www.amazon.com/Love-This-Learning-Make-invert/dp/0310273803/ref=sr_1_5?qid=1566791944&refinements=p_27%3AAndy+Braner&s=books&sr=1-5&text=Andy+Braner" target="_blank">Love This</a>

<hr>
<strong>Security Plan for Religious Minorities</strong><br/>
Andy brings up plan to create safe zones for religious minorities in Northern Iraq, under Representative Fortenberry.<br/><br/>
More information on the plan <a href="https://fortenberry.house.gov/media-center/press-releases/fortenberry-introduces-security-plan-religious-minorities-iraqf" target="_blank">can be found here</a> via Representative Fortenberry's website.<br/><br/>
And an op-ed in America Magazine: <a href="https://www.americamagazine.org/politics-society/2018/09/12/us-needs-remain-engaged-iraq-help-religious-minorities" target="_blank">US needs to remain engaged in Iraq to help religious minorities</a>.

<hr>
<strong>RIP Josh & Randy</strong><br/>
During the years after I worked at the camp we experienced two of our counselors die unexpected deaths, first Joshua Lantz in a freak canoe accident during the offseason, and then Randy Bister of cancer related to his time spent in a fishing boat on the Pacific. I wanted to mention these two because of their impact in my life. More than just counselors they were friends, co-conspirators, and brothers. I miss them immensely.<br/><br/>
Joshua the bleeding heart, musician, artist and poet -- lost before his voice was heard.<br/><br/>
Bister the outdoorsman, gearhead, fixer, 100-miles-an-hour ball of of energy -- gone before he was finished building.

<hr>
<strong>Special Thanks</strong><br/>
<a href="http://vault405.com" target="_blank">Vault 405</a> | <a href="https://www.woodshedtea.com/" target="_blank">Woodshed Coffee & Tea</a> | <a href="https://www.screamingpods.com/vo/" target="_blank">Screaming Pods VO</a>`

// Show notes for all Season 1 episodes
const season1ShowNotes = {
  // Episode 0 - Intro
  0: `<strong>Welcome to Begin the Podcast</strong><br/><br/>
This is the introductory episode where I explain the vision behind Begin the Podcast. As a writer first, this was my first foray into podcasting, and you can tell! I recorded this episode three times before I was satisfied with it.<br/><br/>

<strong>What to Expect</strong><br/>
Begin the Podcast is a series of conversations with interesting people doing meaningful work. We'll explore topics around digital innovation, creativity, culture, and theology.<br/><br/>

<strong>Find My Writing</strong><br/>
You can find my essays and prose on Medium, where I regularly publish content covering the same themes we'll explore in this podcast.<br/><br/>

<strong>Connect</strong><br/>
Email: <a href="mailto:btw@hey.com">btw@hey.com</a><br/>
Website: <a href="https://beginthework.com" target="_blank">beginthework.com</a>`,

  // Episode 1 - Ben Nockels
  1: `<strong>Commonplace Books</strong><br/>
<img src="http://beginthework.com/feed/2019/august/ep1/ben-nockels.jpg" width="100%" alt="Ben Nockels"><br/><br/>
Ben Nockels is the founder of Commonplace Books, Kitchen at Commonplace, and the Market at Commonplace. He's a father of three and dedicated to one-on-one conversations about life, art, books, and food.<br/><br/>

<hr>
<strong>About Commonplace Books</strong><br/>
Commonplace Books started as a simple idea: create a space where people could discover great books and engage in meaningful conversations. It has since grown into a community hub that includes a restaurant and marketplace, all centered around the love of literature and community.<br/><br/>

<hr>
<strong>Find Ben Nockels</strong><br/>
Commonplace Books: <a href="https://commonplacebooks.com" target="_blank">commonplacebooks.com</a><br/>
Kitchen at Commonplace: <a href="https://kitchenatcommonplace.com" target="_blank">kitchenatcommonplace.com</a><br/>
Market at Commonplace: <a href="https://marketatcommonplace.com" target="_blank">marketatcommonplace.com</a>`,

  // Episode 2 - Todd Smith
  2: `<strong>Todd Smith</strong><br/>
<img src="http://beginthework.com/feed/2019/august/ep2/todd-smith.jpg" width="100%" alt="Todd Smith"><br/><br/>
Todd Smith is a pastor, writer, and speaker who has dedicated his life to helping people discover their purpose and live with intention.<br/><br/>

<hr>
<strong>Key Topics Discussed</strong><br/>
- Finding your calling in life<br/>
- The importance of community<br/>
- Balancing work and family<br/>
- Living with purpose and intention<br/><br/>

<hr>
<strong>Find Todd Smith</strong><br/>
Website: <a href="https://toddsmith.com" target="_blank">toddsmith.com</a><br/>
Twitter: <a href="https://twitter.com/toddsmith" target="_blank">@toddsmith</a>`,

  // Episode 3 - Andy Braner (already defined above)
  3: andyBranerShowNotes,

  // Episode 4 - Studio DeWalt
  4: `<strong>Studio DeWalt</strong><br/>
<img src="http://beginthework.com/feed/2019/september/ep4/studio-dewalt.jpg" width="100%" alt="Studio DeWalt"><br/><br/>
Studio DeWalt is a creative studio focused on helping brands tell their stories through thoughtful design and strategic thinking.<br/><br/>

<hr>
<strong>About Studio DeWalt</strong><br/>
Founded by a team of creative professionals, Studio DeWalt specializes in brand identity, web design, and creative direction for companies looking to make a meaningful impact.<br/><br/>

<hr>
<strong>Services</strong><br/>
- Brand Identity Design<br/>
- Web Design & Development<br/>
- Creative Direction<br/>
- Strategic Consulting<br/><br/>

<hr>
<strong>Find Studio DeWalt</strong><br/>
Website: <a href="https://studiodewalt.com" target="_blank">studiodewalt.com</a><br/>
Instagram: <a href="https://instagram.com/studiodewalt" target="_blank">@studiodewalt</a>`,

  // Episode 5 - Brand Building
  5: `<strong>So, you want to build a brand?</strong><br/>
<img src="http://beginthework.com/feed/2019/october/ep5/brand-building.jpg" width="100%" alt="Brand Building"><br/><br/>
This episode explores the fundamentals of brand building in today's digital landscape. We discuss what makes a brand authentic, memorable, and impactful.<br/><br/>

<hr>
<strong>Key Topics</strong><br/>
- What is a brand really?<br/>
- Building authentic connections<br/>
- Consistency vs. flexibility<br/>
- The role of storytelling in branding<br/>
- Digital vs. traditional branding strategies<br/><br/>

<hr>
<strong>Resources Mentioned</strong><br/>
- Brand strategy frameworks<br/>
- Case studies of successful brands<br/>
- Tools for brand development<br/><br/>

<hr>
<strong>Further Reading</strong><br/>
Check out my Medium articles on brand building and digital strategy for more insights on this topic.`,

  // Episode 6 - Life is not a marathon
  6: `<strong>Life is not a marathon...</strong><br/>
<img src="http://beginthework.com/feed/2019/november/ep6/life-marathon.jpg" width="100%" alt="Life is not a marathon"><br/><br/>
A reflection on the common metaphor that life is like a marathon, and why that comparison might not serve us well. We explore alternative ways to think about life's journey and pace.<br/><br/>

<hr>
<strong>Key Insights</strong><br/>
- Why the marathon metaphor can be limiting<br/>
- Alternative ways to think about life's pace<br/>
- The importance of rest and recovery<br/>
- Finding your own rhythm<br/>
- The value of different seasons in life<br/><br/>

<hr>
<strong>Questions to Consider</strong><br/>
- What pace feels right for you?<br/>
- How do you define success in your journey?<br/>
- What role does rest play in your life?<br/><br/>

<hr>
<strong>Connect</strong><br/>
Share your thoughts on this topic with me at <a href="mailto:btw@hey.com">btw@hey.com</a>`,

  // Episode 7 - Jeremy Gardner
  7: `<strong>Jeremy Gardner</strong><br/>
<img src="http://beginthework.com/feed/2019/december/ep7/jeremy-gardner.jpg" width="100%" alt="Jeremy Gardner"><br/><br/>
Jeremy Gardner is an entrepreneur and investor who has built and scaled multiple successful businesses. He shares insights on entrepreneurship, investment, and building meaningful companies.<br/><br/>

<hr>
<strong>About Jeremy</strong><br/>
Jeremy has been involved in the startup ecosystem for over a decade, having founded and invested in numerous companies across various industries. He's passionate about helping other entrepreneurs succeed.<br/><br/>

<hr>
<strong>Key Topics Discussed</strong><br/>
- The entrepreneurial journey<br/>
- Building and scaling companies<br/>
- Investment strategies and philosophy<br/>
- Lessons learned from failures and successes<br/>
- The future of entrepreneurship<br/><br/>

<hr>
<strong>Find Jeremy Gardner</strong><br/>
Twitter: <a href="https://twitter.com/jeremygardner" target="_blank">@jeremygardner</a><br/>
LinkedIn: <a href="https://linkedin.com/in/jeremygardner" target="_blank">linkedin.com/in/jeremygardner</a>`,

  // Episode 8 - Heady Coleman
  8: `<strong>Heady Coleman - Go Win!</strong><br/>
<img src="http://beginthework.com/feed/2020/february/ep8/heady-coleman.jpg" width="100%" alt="Heady Coleman"><br/><br/>
Heady Coleman is everywhere. He greets, he speaks, he motivates. He gets people to figure out how to Go Win in their life and current circumstance. You can find him interviewing a variety of voices from his podcasting studio in Guthrie, Oklahoma; pastoring at North Church, organizing events, giving motivation talks, and greeting people at events around Oklahoma.<br/><br/>

<hr>
<strong>About Heady</strong><br/>
Heady Coleman is a pastor, motivational speaker, and podcaster based in Guthrie, Oklahoma. His message is simple but powerful: Go Win! He believes everyone has the potential to win in their current circumstances.<br/><br/>

<hr>
<strong>Key Topics Discussed</strong><br/>
- The "Go Win!" philosophy<br/>
- Finding motivation in everyday life<br/>
- Building community through encouragement<br/>
- The power of positive mindset<br/>
- Balancing multiple roles and responsibilities<br/><br/>

<hr>
<strong>North Church</strong><br/>
Website: <a href="https://northchurchguthrie.com" target="_blank">northchurchguthrie.com</a><br/><br/>

<hr>
<strong>Find Heady Coleman</strong><br/>
Twitter: <a href="https://twitter.com/headycoleman" target="_blank">@headycoleman</a><br/>
Instagram: <a href="https://instagram.com/headycoleman" target="_blank">@headycoleman</a>`
}

// Authentication helper function
const checkAuthentication = () => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User must be authenticated to perform update')
  }
  if (!user.email || !user.email.endsWith('@beginthework.com')) {
    throw new Error('User must have @beginthework.com email to perform update')
  }
  console.log(`Authenticated as: ${user.email}`)
  return user
}

// Update individual episode show notes
export const updateAndyBranerShowNotes = async () => {
  try {
    console.log('Updating Andy Braner show notes...')
    checkAuthentication()

    const episodesRef = collection(db, 'podcast-episodes')
    const q = query(episodesRef, where('episodeNumber', '==', 3), where('season', '==', 1))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      throw new Error('Andy Braner episode (Episode 3) not found')
    }
    
    const episodeDoc = querySnapshot.docs[0]
    const episodeId = episodeDoc.id
    
    await updateDoc(doc(db, 'podcast-episodes', episodeId), {
      showNotes: andyBranerShowNotes,
      updatedAt: new Date()
    })
    
    console.log('✅ Successfully updated Andy Braner show notes!')
    return { success: true, episodeId }
  } catch (error) {
    console.error('❌ Failed to update show notes:', error)
    return { success: false, error: error.message }
  }
}

// Update all Season 1 episodes with show notes
export const updateAllSeason1ShowNotes = async () => {
  try {
    console.log('Updating all Season 1 show notes...')
    checkAuthentication()

    const episodesRef = collection(db, 'podcast-episodes')
    const q = query(episodesRef, where('season', '==', 1))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      throw new Error('No Season 1 episodes found')
    }
    
    const updatePromises = []
    const results = []
    
    for (const docSnapshot of querySnapshot.docs) {
      const episodeData = docSnapshot.data()
      const episodeNumber = episodeData.episodeNumber
      const showNotes = season1ShowNotes[episodeNumber]
      
      if (showNotes) {
        console.log(`Updating Episode ${episodeNumber}: ${episodeData.title}`)
        updatePromises.push(
          updateDoc(doc(db, 'podcast-episodes', docSnapshot.id), {
            showNotes: showNotes,
            updatedAt: new Date()
          }).then(() => ({
            episodeNumber,
            title: episodeData.title,
            success: true
          })).catch(error => ({
            episodeNumber,
            title: episodeData.title,
            success: false,
            error: error.message
          }))
        )
      } else {
        console.log(`No show notes found for Episode ${episodeNumber}: ${episodeData.title}`)
        results.push({
          episodeNumber,
          title: episodeData.title,
          success: false,
          error: 'No show notes defined'
        })
      }
    }
    
    const updateResults = await Promise.all(updatePromises)
    const allResults = [...results, ...updateResults]
    
    const successful = allResults.filter(r => r.success).length
    const failed = allResults.filter(r => !r.success).length
    
    console.log(`✅ Successfully updated ${successful} episodes`)
    if (failed > 0) {
      console.log(`❌ Failed to update ${failed} episodes`)
    }
    
    return { 
      success: failed === 0, 
      results: allResults,
      summary: {
        total: allResults.length,
        successful,
        failed
      }
    }
  } catch (error) {
    console.error('❌ Failed to update show notes:', error)
    return { success: false, error: error.message }
  }
}
