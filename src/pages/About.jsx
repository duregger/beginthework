import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import SEOHead from '../components/SEOHead'
import { trackPageView, trackSpeakingEngagement, trackConversion } from '../utils/analytics'
import './About.css'
import samPortrait from '../assets/img/team/Sam-DuRegger_Ai_Portrait.jpg'

const About = () => {
  // GA4 Page View Tracking
  useEffect(() => {
    trackPageView('About - Begin the Work', '/about')
  }, [])

  // GA4 Button Click Tracking
  const handleButtonClick = (action, label, category = 'CTA') => {
    trackConversion(`${category}_${action}`, label)
  }

  return (
    <>
      <SEOHead 
        title="About Sam DuRegger | Begin the Work - Digital Strategy Consultant"
        description="Sam DuRegger, Founder and Principal Consultant at Begin the Work, has over 20 years experience in digital technology and delivery. Leading digital transformation at Sonic Drive-In and consulting with QSR, fast casual, and health & fitness companies."
        keywords="Sam DuRegger, digital strategy consultant, product management, Oklahoma City, Begin the Work, Sonic Drive-In, digital transformation, QSR consulting, fast casual, health fitness, product strategy"
        url="/about"
        image="/social-share-OG.png"
        type="profile"
      />

      {/* About Section */}
      <section id="about" className="gray-bg pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="skill-left mb-30">
                <img src={samPortrait} alt="Sam DuRegger" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="section-header mb-60 pt-10">
                <span>Begin the work | About</span>
                <h2>Sam DuRegger, MBA, MA</h2>
              </div>
              <div className="progess-wrapper mb-30">
                <div className="about-right">
                  <p>I am currently looking to collaborate on high-impact projects and Zero to One startups. If your team needs a Fractional Head of Product to bridge strategy and execution, I have 10-20 hours available for the right fit.</p>
                  
                  <p>If you're scaling an AI-driven initiative or need a strategic product partner, please email → <a href="mailto:sam@beginthework.com">sam@beginthework.com</a>.</p>
                </div>
                <hr />
              </div>
            </div>
            <div className="col-xl-12 col-lg-12">
              <div className="progess-wrapper mb-30">
                <div className="section-header mb-60 pt-10">
                  <span>Sam DuRegger | Previous Accomplishments</span>
                  <h2>Corporate & Government Experience</h2>
                </div>
                
                <p>Most recently, Sam has been the FVP, Head of Digital Banking at MidFirst Bank, one of the largest privately held banks in the nation with $36 BB in assets. During his time at MidFirst, Sam led a digital team of 55 in digital transformation and innovation projects. Including internal tools to mitigate fraud, enrich data via machine learning, and to optimize customer support processes. He also had the opportunity lead a small agile team in the development of a React Native app to simplify, modernize, and gamify banking.</p>
                
                <p>During his time at MidFirst, Sam served the State of Oklahoma as Governor Stitt's appointee to the Government Technology Applications Review Board (GTARB) in which Sam was the board appointed Chairman from 2019 - 2021. GTARB's legislated authority includes the review and approval of the Office of Management and Enterprise Services (OMES) rates, as well as the review and approval of e-commerce portal fees and licensing rates by each of the 217 State Agencies, seeking to offer online licensing to Oklahoma citizens.</p>
                
                <p>Previously, Sam was with the State of Oklahoma as the Statewide Director of Citizen Experience -- working towards an omni-channel citizen experience by bringing all of the state services into one MyOK dashboard and directory. Sam also contributed to policy reform to modernize payment and purchasing processes leading to the activation the State of Oklahoma's newly created e-commerce platforms, culminating in the reform and passage of a new Central Purchasing Act, in Spring of 2020. Sam also spent time consulting agency directors on project prioritization, organizational efficiency, and restructuring to meet the needs of the new digital economy.</p>
                
                <p>In his former role as the Director of Product Management at Sonic Drive-In, Sam was responsible for leading the design and development of consumer facing digital products, including Order Ahead across web, iOS, Android and our Point of Personalized Service (POPs) stalls. This omni-channel customer experience involved a revamp of the digital payments strategy, which culminated in a new digital payment infrastructure and support for Credit Card, Apple Pay, Google Pay, Paypal, and Venmo integrations for web and mobile platforms.</p>
                
                <p>Since 2016, Sam contributed in a leadership capacity to Sonic's digital transformation, referenced by Inspire Brands as a major reason behind their $2.3B acquisition of Sonic Drive-In in late 2018. The teams Sam led were responsible for the retirement of an aging monolithic code base, lifting all infrastructure to AWS Cloud Services, as well as the development of continuous delivery, continuous integration infrastructure in support of the Digital Innovation Platform. Sam was also instrumental in leading the Domain API development which is now being utilized by Order Ahead on mobile apps, the website, POPS (kiosks) and the Voice UX platforms.</p>
                
                <p>From 2014-2016, Sam led the experience design and software implementation of Sonic's POPs stalls -- 80,000 touchscreens throughout Sonic's 3,600 stores. The POPs program helped boost same store sales growth of 3% in the first two years of service at Drive-In's, and continues to be a differentiator across the QSR industry delivering personalization and order status for customers ordering via Order Ahead.</p>
                
                <p>Previous to Sonic, Sam spent 8+ years in the startup world, he has worked on projects for the PGA, Subaru Motors, Ford, EA Sports, Starbucks, Blue Bottle, Stumptown, La Colombe and Mastercard. During these entrepreneurial years, Sam contributed at the Director level in Marketing, Product Management and Business Development.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <section id="book" className="cta-area mt-90">
          <div className="container">
            <div className="cta-box secondary-bg pt-80 pb-50">
              <div className="row">
                <div className="col-xl-12">
                  <div className="cta-text mb-30">
                  <span>Speaking & Facilitation</span>
                    <h2 className="text-white">Bring Sam to your organization, classroom, or event.</h2>
                    <p className="text-white">Intentional, paid engagements on creativity, leadership, and the future of work.</p>
                  </div>
                </div>
                <div className="col-xl-12 d-flex align-items-center justify-content-start justify-content-xl-end">
                  <div className="project-right mb-30">
                    <div className="project-btn">
                      <a href="mailto:btw@hey.com" target="_blank" rel="noopener noreferrer" className="btn capitalize" onClick={() => handleButtonClick('click', 'email_cta', 'CTA')}>
                        <i className="far fa-envelope"></i>Email →
                      </a>
                      <a href="/speaking" className="btn btn-border capitalize" onClick={() => handleButtonClick('click', 'speaking_details', 'CTA')}>
                        <i className="fas fa-microphone"></i>View Speaking Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Skills and Education Section */}
      <section className="education pt-120 pb-90 mt-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="section-header mb-60 pt-10">
                <span>Skillset</span>
                <h2>Strengths</h2>
              </div>
              <div className="progess-wrapper mb-30">
                <div className="single-skill mb-40">
                  <div className="bar-title">
                    <h4>Product Management</h4>
                  </div>
                  <div className="progress">
                    <div className="progress-bar wow slideInLeft" data-wow-duration="1s" data-wow-delay=".6s" role="progressbar" style={{width: "93%"}} aria-valuenow="93" aria-valuemin="0" aria-valuemax="100">
                      <span>93%</span>
                    </div>
                  </div>
                </div>
                <div className="single-skill mb-40">
                  <div className="bar-title">
                    <h4>E-commerce Strategy</h4>
                  </div>
                  <div className="progress">
                    <div className="progress-bar wow slideInLeft" data-wow-duration="1s" data-wow-delay=".6s" role="progressbar" style={{width: "90%"}} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                      <span>90%</span>
                    </div>
                  </div>
                </div>
                <div className="single-skill mb-40">
                  <div className="bar-title">
                    <h4>AI Strategy</h4>
                  </div>
                  <div className="progress">
                    <div className="progress-bar wow slideInLeft" data-wow-duration="1s" data-wow-delay=".6s" role="progressbar" style={{width: "87%"}} aria-valuenow="84" aria-valuemin="0" aria-valuemax="100">
                      <span>87%</span>
                    </div>
                  </div>
                </div>
                <div className="single-skill mb-40">
                  <div className="bar-title">
                    <h4>Product Design</h4>
                  </div>
                  <div className="progress">
                    <div className="progress-bar wow slideInLeft" data-wow-duration="1s" data-wow-delay=".6s" role="progressbar" style={{width: "84%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100">
                      <span>84%</span>
                    </div>
                  </div>
                </div>
                <div className="single-skill">
                  <div className="bar-title">
                    <h4>Agile Coaching</h4>
                  </div>
                  <div className="progress">
                    <div className="progress-bar wow slideInLeft" data-wow-duration="1s" data-wow-delay=".6s" role="progressbar" style={{width: "98%"}} aria-valuenow="92" aria-valuemin="0" aria-valuemax="100">
                      <span>98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-6 col-lg-6">
              <div className="section-header mb-60">
                <span>Qualifications</span>
                <h2>Education</h2>
              </div>
              <div className="education-qualification-body mb-30">
                <div className="education-content mb-50">
                  <div className="education-header">
                    <h4>Oklahoma State University, Spears College of Business [2018-2019]</h4>
                    <h1>Certificate in Effective Management and Leadership</h1>
                  </div>
                  <div className="education-text">
                    <p></p>
                  </div>
                </div>

                <div className="education-content mb-50">
                  <div className="education-header">
                    <h4>John Brown University [2006-2007]</h4>
                    <h1>Master of Arts (MA)</h1>
                  </div>
                  <div className="education-text">
                    <p></p>
                  </div>
                </div>

                <div className="education-content">
                  <div className="education-header">
                    <h4>University of Oklahoma, Price College of Business [2004-2006]</h4>
                    <h1>Masters of Business Administration (MBA)</h1>
                    <h1>Focus: Entrepreneurship and Venture Management</h1>
                  </div>
                  <div className="education-text">
                    <p></p>
                  </div>
                </div>
                <br />
                <div className="education-content">
                  <div className="education-header">
                    <h4>University of Tulsa. [1997-2001]</h4>
                    <h1>Bachelors of Science (BS)</h1>
                    <h1>Exercise and Sport Sciences</h1>
                  </div>
                  <div className="education-text">
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <br />
        <div className="single-border"></div>
      </section>
    </>
  )
}

export default About
