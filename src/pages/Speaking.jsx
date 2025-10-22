import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEOHead from '../components/SEOHead'
import './Speaking.css'
import speakingData from '../data/speaking.json'
import { trackPageView, trackSpeakingEngagement, trackConversion } from '../utils/analytics'
import samVerge from '../assets/img/team/Sam_Verge_2.jpg'
import samVerge1 from '../assets/img/team/Sam_Verge_1.jpg'
import samBridge2_1 from '../assets/img/team/Sam_Bridge2_1.jpeg'
import samBridge2_2 from '../assets/img/team/Sam_Bridge2_2.jpeg'

const Speaking = () => {
  const [expandedCards, setExpandedCards] = useState({})
  const [currentImage, setCurrentImage] = useState(samVerge)

  // GA4 Page View Tracking
  useEffect(() => {
    trackPageView('Speaking & Workshops - Begin the Work', '/speaking')
  }, [])

  // GA4 Button Click Tracking
  const handleButtonClick = (action, label, category = 'CTA') => {
    trackConversion(`${category}_${action}`, label)
  }

  const handleSpeakingEngagement = (topicId, action) => {
    trackSpeakingEngagement(action, topicId)
  }

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const renderSpeakingCard = (item, sectionId) => {
    const cardId = `${sectionId}-${item.id}`
    const isExpanded = expandedCards[cardId]

    return (
      <div key={item.id} className="speaking-card">
        <div className="speaking-card-header" onClick={() => toggleCard(cardId)}>
          <h4>
            {item.video && item.video.url && (
              <i className="fas fa-play-circle video-indicator"></i>
            )}
            {item.title}
          </h4>
          <div className="card-meta">
            <span className="duration">{item.duration}</span>
            <span className="audience">{item.audience}</span>
          </div>
          <div className="expand-icon">
            <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
          </div>
        </div>
        
        <div className="speaking-card-body">
          <p className="short-description">{item.shortDescription}</p>
          
          {isExpanded && (
            <div className="expanded-content">
              <div className="long-description">
                <p>{item.longDescription}</p>
              </div>
              
              {item.video && item.video.url && (
                <div className="video-section">
                  <h5>Video</h5>
                  {item.video.type === 'youtube' && item.video.embedId ? (
                    <div className="video-embed">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${item.video.embedId}`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : item.video.type === 'loom' && item.video.embedId ? (
                    <div className="video-embed">
                      <div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}>
                        <iframe
                          src={`https://www.loom.com/embed/${item.video.embedId}`}
                          frameBorder="0"
                          webkitAllowFullScreen
                          mozAllowFullScreen
                          allowFullScreen
                          style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                        ></iframe>
                      </div>
                    </div>
                  ) : (
                    <a href={item.video.url} target="_blank" rel="noopener noreferrer" className="video-link">
                      <i className="fas fa-play"></i> Watch Video
                    </a>
                  )}
                </div>
              )}
              
              {item.slides && item.slides.url && (
                <div className="slides-section">
                  <h5>Slides</h5>
                  <a href={item.slides.url} target="_blank" rel="noopener noreferrer" className="slides-link">
                    <i className="fas fa-file-powerpoint"></i> {item.slides.title || 'View Slides'}
                  </a>
                </div>
              )}
              
              {item.testimonial && (
                <div className="testimonial-section">
                  <h5>Testimonial</h5>
                  {item.testimonial.quote && (
                    <blockquote style={{
                      fontSize: '1rem',
                      fontStyle: 'italic',
                      color: '#333',
                      margin: '0 0 1rem 0',
                      lineHeight: '1.5',
                      borderLeft: '3px solid #2a4799',
                      paddingLeft: '1rem'
                    }}>
                      "{item.testimonial.quote}"
                    </blockquote>
                  )}
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    fontWeight: '500'
                  }}>
                    <div style={{marginBottom: '0.25rem'}}>
                      - <a href={item.testimonial.authorUrl} target="_blank" rel="noopener noreferrer" style={{color: '#2a4799', textDecoration: 'none'}}>{item.testimonial.author}</a>
                    </div>
                    <div style={{fontSize: '0.8rem', color: '#888'}}>
                      {item.testimonial.title}<br />
                      {item.testimonial.type === 'educational' ? (
                        <>
                          {item.testimonial.school}<br />
                          <a href={item.testimonial.universityUrl} target="_blank" rel="noopener noreferrer" style={{color: '#2a4799', textDecoration: 'none'}}>{item.testimonial.university}</a>
                        </>
                      ) : (
                        <>
                          {item.testimonial.company}<br />
                          <a href={item.testimonial.companyUrl} target="_blank" rel="noopener noreferrer" style={{color: '#2a4799', textDecoration: 'none'}}>{item.testimonial.company}</a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="card-details">
                <div className="detail-item">
                  <strong>Duration:</strong> {item.duration}
                </div>
                <div className="detail-item">
                  <strong>Audience:</strong> {item.audience}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead 
        title="Speaking & Workshops | Sam DuRegger - Digital Strategy Keynotes"
        description="Invite Sam DuRegger to speak about AI strategy, product management, and digital transformation. Keynotes, workshops, and guest lectures on the intersection of humans, technology, and purpose. Speaking fees $1,500-$3,000."
        keywords="Sam DuRegger speaking, AI strategy keynote, product management speaker, digital transformation talks, workshop facilitation, guest lectures, Oklahoma City speaker, tech conference speaker"
        url="/speaking"
        image="/social-share-OG.png"
        type="website"
      />

      {/* Hero Section */}
      <section id="speaking" className="gray-bg pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="skill-left mb-30">
                <img src={currentImage} alt="Sam speaking at The Verge OKC" />
                <p style={{fontSize: '0.9rem', color: '#666', marginTop: '1rem', fontStyle: 'italic'}}>
                  {currentImage === samBridge2_1 || currentImage === samBridge2_2 
                    ? "Sam at Bridge 2's Showcase Event, in 2024." 
                    : "Sam speaking at The Verge OKC"}
                </p>
                
                {/* Thumbnail Gallery */}
                <div className="thumbnail-gallery" style={{display: 'flex', gap: '8px', marginTop: '1rem', height: '60px'}}>
                  <div className="thumbnail-item" style={{flex: '1'}}>
                    <img 
                      src={samVerge} 
                      alt="Speaking engagement" 
                      style={{
                        width: '100%', 
                        height: '100%', 
                        aspectRatio: '1',
                        objectFit: 'cover', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        opacity: currentImage === samVerge ? '1' : '0.7',
                        border: currentImage === samVerge ? '2px solid #2a4799' : '2px solid transparent'
                      }}
                      onClick={() => setCurrentImage(samVerge)}
                    />
                  </div>
                  <div className="thumbnail-item" style={{flex: '1'}}>
                    <img 
                      src={samVerge1} 
                      alt="Speaking engagement" 
                      style={{
                        width: '100%', 
                        height: '100%', 
                        aspectRatio: '1',
                        objectFit: 'cover', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        opacity: currentImage === samVerge1 ? '1' : '0.7',
                        border: currentImage === samVerge1 ? '2px solid #2a4799' : '2px solid transparent'
                      }}
                      onClick={() => setCurrentImage(samVerge1)}
                    />
                  </div>
                  <div className="thumbnail-item" style={{flex: '1'}}>
                    <img 
                      src={samBridge2_1} 
                      alt="Speaking engagement" 
                      style={{
                        width: '100%', 
                        height: '100%', 
                        aspectRatio: '1',
                        objectFit: 'cover', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        opacity: currentImage === samBridge2_1 ? '1' : '0.7',
                        border: currentImage === samBridge2_1 ? '2px solid #2a4799' : '2px solid transparent'
                      }}
                      onClick={() => setCurrentImage(samBridge2_1)}
                    />
                  </div>
                  <div className="thumbnail-item" style={{flex: '1'}}>
                    <img 
                      src={samBridge2_2} 
                      alt="Speaking engagement" 
                      style={{
                        width: '100%', 
                        height: '100%', 
                        aspectRatio: '1',
                        objectFit: 'cover', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        opacity: currentImage === samBridge2_2 ? '1' : '0.7',
                        border: currentImage === samBridge2_2 ? '2px solid #2a4799' : '2px solid transparent'
                      }}
                      onClick={() => setCurrentImage(samBridge2_2)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="section-header mb-60 pt-10">
                <span>Begin the work | Speaking</span>
                <h2>Speaking & Workshops</h2>
              </div>
              <div className="progess-wrapper mb-30">
                <div className="about-right">
                  <p>I design and lead conversations about how humans, technology, and purpose intersect.</p>
                  
                  <p>Whether you're building product cultures, navigating digital transformation, or exploring what meaningful work looks like in our post-digital age, I help teams think differently about the systems we create and the choices we make.</p>
                  
                  <p className="mt-4 speaking-fee-text">
                    Speaking fees vary based on event type and duration. Investment typically ranges from $1,500-$3,000 for keynotes. Partnership opportunities are available. 
                  </p>
                  
                  <div className="mt-4">
                    <a href="mailto:btw@hey.com?subject=Speaking Inquiry" className="btn capitalize" onClick={() => handleButtonClick('click', 'speaking_inquiries_hero', 'CTA')}>
                      <i className="far fa-envelope"></i>Speaking Inquiries
                    </a>
            
                  </div>

                  

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Talks & Keynotes Section */}
      {speakingData.talksAndKeynotes && speakingData.talksAndKeynotes.categories && (
        <section className="format-section pt-90 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h2 className="format-title">{speakingData.talksAndKeynotes.title}</h2>
                <p className="format-description">{speakingData.talksAndKeynotes.subtitle}</p>
              </div>
              <div className="col-lg-8">
                {Object.entries(speakingData.talksAndKeynotes.categories).map(([categoryKey, categoryData]) => (
                  <div key={categoryKey} className="category-section mb-60">
                    <h3 className="category-title">{categoryData.title}</h3>
                    <p className="category-subtitle">{categoryData.subtitle}</p>
                    <div className="speaking-cards">
                      {categoryData.items.map(item => renderSpeakingCard(item, `talksAndKeynotes-${categoryKey}`))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product & Organizational Keynotes Section */}
      {speakingData.productAndOrganizational && (
        <section className="format-section pt-90 pb-90 alt-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h2 className="format-title">{speakingData.productAndOrganizational.title}</h2>
                <p className="format-description">{speakingData.productAndOrganizational.subtitle}</p>
              </div>
              <div className="col-lg-8">
                <div className="speaking-cards">
                  {speakingData.productAndOrganizational.items.map(item => renderSpeakingCard(item, 'productAndOrganizational'))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Guest Lectures & Dialogues Section */}
      {speakingData.guestLecturesAndDialogues && (
        <section className="format-section pt-90 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h2 className="format-title">{speakingData.guestLecturesAndDialogues.title}</h2>
                <p className="format-description">{speakingData.guestLecturesAndDialogues.subtitle}</p>
              </div>
              <div className="col-lg-8">
                <div className="speaking-cards">
                  {speakingData.guestLecturesAndDialogues.items.map(item => renderSpeakingCard(item, 'guestLecturesAndDialogues'))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Workshops & Facilitation Section */}
      {speakingData.workshopsAndFacilitation && (
        <section className="format-section pt-90 pb-90 alt-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h2 className="format-title">{speakingData.workshopsAndFacilitation.title}</h2>
                <p className="format-description">{speakingData.workshopsAndFacilitation.subtitle}</p>
              </div>
              <div className="col-lg-8">
                <div className="speaking-cards">
                  {speakingData.workshopsAndFacilitation.items.map(item => renderSpeakingCard(item, 'workshopsAndFacilitation'))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Second CTA Section */}
      <section className="speaking-cta pt-80 pb-80">
        <div className="container">
          <div className="cta-box secondary-bg pt-80 pb-50">
            <div className="row">
              <div className="col-xl-12 text-center">
                <div className="cta-text mb-30">
                  <h2 className="text-white">Let's begin the conversation!</h2>
                  <p className="text-white-50">Ready to invite Sam to speak? Let's explore what kind of conversation would serve your audience best.</p>
                </div>
                <div className="speaking-cta-buttons">
                  <a href="mailto:btw@hey.com?subject=Speaking Inquiry" className="btn capitalize">
                    <i className="far fa-envelope"></i>Invite Sam to Speak →
                  </a>
                  <a href="/about" className="btn btn-border capitalize">
                    <i className="far fa-user"></i>Learn More About Sam
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
  )
}

export default Speaking
