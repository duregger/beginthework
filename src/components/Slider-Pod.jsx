import React, { useEffect } from 'react'

const Slider = () => {
  useEffect(() => {
    let typedInstance = null;
    
    // Initialize Typed.js animation after component mounts
    const initTyped = () => {
      if (window.Typed && document.getElementById('typed')) {
        // Destroy any existing instance first
        if (typedInstance) {
          typedInstance.destroy();
        }
        
        typedInstance = new window.Typed("#typed", {
          stringsElement: "#typed-strings",
          typeSpeed: 100,
          smartBackspace: true,
        });
      } else {
        // If Typed.js isn't loaded yet, try again after a short delay
        setTimeout(initTyped, 100);
      }
    };

    // Start the initialization
    initTyped();
    
    // Cleanup function to destroy Typed.js instance when component unmounts
    return () => {
      if (typedInstance) {
        typedInstance.destroy();
      }
    };
  }, []);
  return (
    <>
      {/* slider-area Start */}
      <section id="home" className="slider-area gray-bg">
        <div className="slider-active">
          <div className="single-slider gray-bg d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-9 col-lg-11">
                  <div className="slider-content">
                    <div className="wrapper">
                      <div className="top">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 180" className="logo">
                          <path
                            fill="#2a4799" d="M0 136v-4.45c11.65-.83 15-4.75 15-17.13V24.9C15 12.52 11.65 8.61 0 7.77V3.32h71c30 0 45.19 9.87 45.19 29.33C116.21 45 109.4 53 94.77 57.74l-1.67.55 1.71.42c22 5.45 34.7 19.75 34.7 39.23a37.57 37.57 0 0 1-15 29.62c-8 5.82-18.76 8.42-35 8.42zm61.57-73.63a37 37 0 0 0-4.68.2l-.44.06v42.48c0 14.89.93 23.94 13.8 23.94 7.24 0 19.39-4.2 19.39-32.28 0-22.18-9.96-34.4-28.07-34.4zm-.19-51.72a35.26 35.26 0 0 0-4.49.2l-.44.05v45.7h1.85c16.91 0 24.79-7.12 24.79-22.4 0-15.63-7.3-23.55-21.71-23.55zm123 129.4a46 46 0 0 1-35.86-16.67c-7.34-8.7-11.06-19.41-11.06-31.84a53.86 53.86 0 0 1 10.89-33.4c7.93-10.89 22.65-18.2 36.65-18.2 24 0 39.58 15.86 39.79 40.45h-54.61v.52c.75 22.58 16.38 39.61 36.36 39.61a23.71 23.71 0 0 0 17.82-7.36v7.45c-10.63 12.72-24.45 19.44-39.98 19.44zm1.35-94c-10.88 0-15.73 8.64-15.73 28v.5h9.18c13.18 0 19.2 0 19.2-11.15 0-11.46-4.26-17.3-12.65-17.3zm213.69 89.83v-4.38c-7.93-.35-11.18-4.51-11.18-14.24v-77.8l-46 22.17 7.76 6.46.07-.06.31.34c2.24 2.4 2.62 4.65 2.62 8.79v40.1c0 10.12-3.5 14.25-12.07 14.25h-.08v4.42zM388.51 38.7h.23zm-1.24-20.22a18.39 18.39 0 1 0-36.78 0 18.39 18.39 0 1 0 36.78 0zM522 136v-4.41h-.08c-8.57 0-12.07-4.13-12.07-14.26V71.59c0-21.17-9.86-31.46-30.15-31.46-10.49 0-19.32 3.66-26.24 10.87l-.86.89v-15.7l-46 22.17 7.77 6.46h.07l.31.33c2.24 2.4 2.62 4.65 2.62 8.79v43.37c0 10.12-3.5 14.25-12.07 14.25h-.08v4.42h58.57v-4.48c-7.93-.35-11.18-4.51-11.18-14.24V63a11.12 11.12 0 0 1 2.65-5.45 8.48 8.48 0 0 1 7-3.65 12.55 12.55 0 0 1 1.3-.08 10.91 10.91 0 0 1 2.52.3 8.69 8.69 0 0 1 4.83 2.5 11.19 11.19 0 0 1 3.73 8.38v71zM0 180v-17.9h296.9c3.44-.22 8.05-1.21 10.43-4.68a8.94 8.94 0 0 0 1.17-7.21 7.4 7.4 0 0 0-3.87-4.9 16 16 0 0 0-7.19-1.48c-4.69 0-9.77 1.4-13.13 2.33a76 76 0 0 1-20.08 3.08c-7.73 0-14.51-1.76-20.14-5.23-9.2-5.68-13.3-17.79-9.75-28.8a23.5 23.5 0 0 1 6.4-10c1.43-1.33 8.3-6.71 10.55-6.71a.59.59 0 0 1 .3.06l.54-.84c-8.55-5.61-13.26-14.13-13.26-24 0-20 19-34 46.15-34a54.29 54.29 0 0 1 10.69 1.16l.42.08.15-.4c4.12-10.71 12.81-17.11 23.25-17.11 7.53 0 13 4.84 13 11.51a9.63 9.63 0 0 1-9.72 10c-3.64 0-6.84-1.9-9.66-3.56-2.46-1.46-4.78-2.84-7.11-2.84a4.94 4.94 0 0 0-4.68 2.78l-.29.53.57.19c16.8 5.76 25.68 16.44 25.69 30.91 0 19.62-18.47 32.81-46 32.81a65.89 65.89 0 0 1-22.39-4h-.26c-6.2 1.17-10 4.7-10 9.22 0 3.21 1.2 5.6 3.55 7.08a14.61 14.61 0 0 0 7.81 1.79 44.81 44.81 0 0 0 10.55-1.48c3.31-.82 6.64-1.86 9.86-2.87 6.88-2.16 14-4.39 21.24-4.53h.88c8.59 0 16.4 2.59 22 7.31 6 5 9.14 12.17 9.14 20.6a32.61 32.61 0 0 1-8.71 22.36l-.77.84H522V180zM283.09 45.52c-11.78 0-14.19 10.89-14.19 27.23 0 18.94 4.11 26.66 14.19 26.66s14.19-7.67 14.19-26.41c0-19.54-4.11-27.48-14.19-27.48z"/>
                        </svg>
                        <div id="typed-strings">
                          <span>the pod.</span>
                        </div>
                        <span id="typed" className="gf-custom headline"></span>
                      </div>   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </section>
      {/* slider-area end */}
    </>
  )
}

export default Slider
