import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Slider from '../components/Slider'
import SEOHead from '../components/SEOHead'
import { trackPageView, trackSpeakingEngagement, trackProjectEngagement, trackConversion } from '../utils/analytics'
import './Home.css'
import samPortrait from '../assets/img/team/Sam-DuRegger_Ai_Portrait.jpg'
import projectsData from '../data/projects.json'

// Import project images
import cafeRioImage from '../assets/img/projects/Cafe-Rio-Web.png'
import wylderImage from '../assets/img/projects/wylder-app.jpeg'
import finalSurgeImage from '../assets/img/projects/final-surge-12-2023-final-print.jpg'
import gutenstackImage from '../assets/img/projects/gutenstack-mark_background.png'
import storybuildImage from '../assets/img/projects/storybuild_journal.jpeg'
import ibfpImage from '../assets/img/projects/I_Build_for_people_Cover.png'
import artificialllyImage from '../assets/img/projects/artificiallly.png'
import drawYourOwnAdventureImage from '../assets/img/projects/Sam_and_Gus_Artic_Explorer_front.png'
import beginStrengthImage from '../assets/img/projects/begin-strength.png'
import substackIcon from '../assets/img/arrow/substack_logo_icon_249485.png'

const Home = () => {
  // Scripts are loaded directly in index.html, no need for dynamic loading

  // GA4 Page View Tracking
  useEffect(() => {
    trackPageView('Home - Begin the Work', '/')
  }, [])

  // GA4 Button Click Tracking
  const handleButtonClick = (action, label, category = 'CTA') => {
    trackConversion(`${category}_${action}`, label)
  }

  const handleProjectClick = (projectName, action) => {
    trackProjectEngagement(action, projectName)
  }

  // Image mapping object
  const imageMap = {
    'cafe-rio': cafeRioImage,
    'wylder-app': wylderImage,
    'final-surge': finalSurgeImage,
    'begin-strength-fractional': beginStrengthImage,
    'gutenstack': gutenstackImage,
    'storybuild': storybuildImage,
    'i-build-for-people': ibfpImage,
    'draw-your-own-adventure': drawYourOwnAdventureImage,
    'artificiallly': artificialllyImage,
    'product-journals': storybuildImage,
    'begin-strength': beginStrengthImage
  }

  // Helper function to render project cards
  const renderProjectCard = (project) => (
    <div key={project.id} className="our-team-wrapp mb-30" onClick={() => handleProjectClick(project.title, 'view')} style={{cursor: 'pointer'}}>
      <div className="our-team-image">
        <img src={imageMap[project.id]} alt={project.alt} />
        {project.status === 'current' && (
          <div className="status-badge current">CURRENT</div>
        )}
        {project.status === 'active' && (
          <div className="status-badge active">ACTIVE</div>
        )}
        {project.status === 'discovery' && (
          <div className="status-badge discovery">DISCOVERY</div>
        )}
      </div>
      <div className="team-contents text-center">
        <h4>{project.role}</h4>
        <span>{project.title}</span>
        <div>
          <p>{project.description}</p>
        </div>
      </div>
      <div className="read-more">
        <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>{project.linkText}</a>
      </div>
    </div>
  )

  return (
    <>
      <SEOHead 
        title="BEGIN | the work - Digital Strategy & Product Management Consulting"
        description="Begin the Work helps businesses navigate digital transformation, product management, AI strategy, and entrepreneurship. Led by Sam DuRegger, we provide strategic consulting to launch and scale innovative products, optimize workflows, and drive business growth."
        keywords="digital strategy, product management, AI consulting, Oklahoma City, Sam DuRegger, Begin the Work, digital transformation, startup consulting, entrepreneurship, product strategy, AI strategy"
        url="/"
        image="/OG.png"
        type="website"
      />

      <Slider />

      {/* About Section */}
      <section id="about" className="pt-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="section-header">
                <span>Begin the work, LLC</span>
                <h3>Helping you <u>begin</u> and finish what you've <u>begun</u> so you can <u>begin, again</u>.</h3>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="about-right">
                <p>Welcome to Begin the work. We are passionate about spurring your business toward audacious digital goals through agile approaches that drive revenue and build trust. We have delivered omni-channel experiences across high growth startups, small businesses, publicly traded corporate environments, progressive FinTech's and have also delivered digital transformation projects for the State of Oklahoma.</p>
                <div className="about-btn">
                  <a href="#featured-work" className="btn btn-secondary" onClick={() => handleButtonClick('click', 'learn_more', 'Hero')}>Learn More</a>
                  <Link to="/podcast" className="btn btn-other" onClick={() => handleButtonClick('click', 'listen_podcast', 'Hero')}>Listen to Podcast</Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      <section>
  <br />
  <div className="spacer-white"></div>
</section>

      {/* Founder Section */}
      <section id="founder" className="pt-80 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-4">
              <div className="founder-image text-center">
                <img 
                  src={samPortrait} 
                  alt="Sam DuRegger" 
                  className="circular-headshot"
                />
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div className="founder-content">             
                <p>Hello. I'm Sam DuRegger, and I'm a product strategist whose work bridges technology, marketing, design, and customer experience. My career spans government, fintech, and large-scale consumer brands, including leading digital transformation as Head of Product at Sonic Drive-In. Through Begin the Work, I now partner with teams in QSR, fast casual, and health & fitness; helping them navigate the complex space between legacy systems and evolving digital expectations.</p>
                
                <div className="about-btn">
                  <Link to="/about" className="btn btn-other" onClick={() => handleButtonClick('click', 'about_founder', 'Founder')}>About our founder</Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="pt-115 pb-90">
        <div className="container">
          
          <div className="section-header">
            <span>Experience and Competencies</span>
            <br/><br/>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="services-body mb-30">
                <div className="services-content">
                  <h4>Zero-to-One</h4>
                  <p>Have an idea? I can help you get from 0-1, with designs, website, and/or a prototype. I can help create context to the story and spreadsheet you are creating for your business.</p>
                  <ul className="services-icon">
                    <li><i className="fas fa-roadmap">•</i><span>Product Design</span></li>
                    <li><i className="fas fa-roadmap">•</i><span>Design Systems</span></li>
                    <li><i className="fas fa-roadmap">•</i><span>Prototypes</span></li>
                    <li><i className="fas fa-roadmap">•</i><span>Pitch Decks</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="services-body mb-30">
                <div className="services-content">
                  <h4>Digital Transformation</h4>
                  <p>Transformation is slow and difficult work, not shiny new distractions. I have helped large enterprises spark the momentum required for foundational change built for the long-term.</p>
                  <ul className="services-icon">
                    <li><i className="fas fa-roadmap">•</i><span>Change Management</span></li>
                    <li><i className="fas fa-roadmap">•</i><span>Agile Methodologies</span></li>
                    <li><i className="fas fa-roadmap">•</i><span>Collaborative Teams</span></li>
                    <li><i className="fas fa-roadmap">•</i><span>Remote Work Tools</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="services-body mb-30">
                <div className="services-content">
                  <h4>Product Management</h4>
                  <p>Product is a mindset. From global brands innovating on new platforms, to refresh stale citizen experiences within government bureaucracy -- the experience must build trust.</p>
                  <ul className="services-icon">
                    <li><i className="fas fa-roadmap">•</i><span>Competitive Landscape</span></li>
                    <li><i className="far fa-roadmap">•</i><span>Project Prioritization</span></li>
                    <li><i className="far fa-roadmap">•</i><span>Product Roadmaps</span></li>
                    <li><i className="fas fa-roadmap">•</i><span>Experience Optimization</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="book" className="cta-area mt-90">
        <div className="container">
          <div className="cta-box secondary-bg pt-80 pb-50">
            <div className="row">
              <div className="col-xl-12">
                <div className="cta-text mb-30">
                  <span>Fractional Consulting</span>
                  <h2 className="text-white">In search of a Fractional Product or Digital leader? I'm here to help.</h2> 
                </div>
              </div>
              <div className="col-xl-12 d-flex align-items-center justify-content-start justify-content-xl-end">
                <div className="project-right mb-30">
                  <div className="project-btn">
                    <a href="mailto:btw@hey.com" target="_blank" rel="noopener noreferrer" className="btn capitalize" onClick={() => handleButtonClick('click', 'email_cta', 'CTA')}>
                      <i className="far fa-envelope"></i>Email →
                    </a>
                    <a href="https://beginthework.substack.com" target="_blank" rel="noopener noreferrer" className="btn btn-border capitalize" onClick={() => handleButtonClick('click', 'substack_cta', 'CTA')}>
                      <img src={substackIcon} alt="Substack" className="substack-icon-switch" style={{width: '16px', height: '16px', marginRight: '8px'}} />
                      On Substack
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
     <br />
      <div className="spacer-accent"></div>
    </section>

      {/* Featured Work Section */}
      <section id="featured-work" className="pt-120 pb-90 gray-bg">
        <div className="container">
          <div className="section-header text-center mb-55">
            <span>{projectsData.fractionalConsulting.subtitle}</span>
            <h2>{projectsData.fractionalConsulting.title}</h2>
          </div>
          <div className="grid-container">
            {projectsData.fractionalConsulting.items.map(renderProjectCard)}
          </div>
        </div>
      </section>

{/* Owned Projects Section */}
<section id="owned-projects" className="pt-120 pb-90 gray-bg">
        <div className="container">
          <div className="section-header text-center mb-55">
            <span>{projectsData.ownedProjects.subtitle}</span>
            <h2>{projectsData.ownedProjects.title}</h2>
          </div>
          <div className="grid-container">
            {projectsData.ownedProjects.items.map(renderProjectCard)}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="pt-120 pb-90 gray-bg">
        <div className="container">
          <div className="section-header text-center mb-55">
            <span>{projectsData.resources.subtitle}</span>
            <h2>{projectsData.resources.title}</h2>
          </div>
          <div className="grid-container">
            {projectsData.resources.items.map(renderProjectCard)}
          </div>
        </div>
      </section>

       {/* CTA Section */}
       <section id="book" className="cta-area mt-90">
        <div className="container">
          <div className="cta-box secondary-bg pt-80 pb-50">
            <div className="row">
              <div className="col-xl-12">
                <div className="cta-text mb-30">
                  <span>A Product Manifesto</span>
                  <h2 className="text-white">Sam DuRegger's first book, I Build For People is now available!</h2> 
                </div>
              </div>
              <div className="col-xl-12 d-flex align-items-center justify-content-start justify-content-xl-end">
                <div className="project-right mb-30">
                  <div className="project-btn">
                    <a href="https://books.story.build/6/i-build-for-people" target="_blank" rel="noopener noreferrer" className="btn capitalize" onClick={() => handleButtonClick('click', 'read_online', 'CTA')}>
                      <i className="fas fa-book"></i>Read Online →
                    </a>
                    <a href="https://beginthework.substack.com/t/product-manifesto" target="_blank" rel="noopener noreferrer" className="btn btn-border capitalize" onClick={() => handleButtonClick('click', 'read_substack', 'CTA')}>
                      <img src={substackIcon} alt="Substack" className="substack-icon-switch" style={{width: '16px', height: '16px', marginRight: '8px'}} />
                      On Substack
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
<section>
  <br />
  <div className="spacer-footer"></div>
</section>

    </>
  )
}

export default Home
