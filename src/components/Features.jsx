import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { animateWithGsap } from '../utils/animations';
import { explore1Img, explore2Img, exploreVideo } from '../utils';
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const exploreVideoRef = useRef();

  useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom'
      },
      onComplete: () => {
        console.log("Completed : ");
        exploreVideoRef.current.play();
      }
    })

    animateWithGsap('#features-title', {
      y: 0,
      opacity: 1,
    });
    animateWithGsap('.g-grow', {
      scale: 1,
      opacity: 1,
      ease: 'power1'
    }, { scrub: 5 });
    animateWithGsap('.g-text', {
      y: 0,
      opacity: 1,
      ease: 'power2.inOut', 
      duration: 0.8
    });
  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1
            id="features-title"
            className="section-heading"
          >
            Explore the full story.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold"> iPhone. </h2>
            <h2 className="text-5xl lg:text-7xl font-semibold"> Forged in titanium. </h2>
          </div>
          <div className="flex-center flex-col sm:px-10">
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                id="exploreVideo"
                ref={exploreVideoRef}
                playsInline
                autoPlay
                muted
                preload='none'
                className="w-full h-full object-cover object-center"
              >
                <source src={exploreVideo} type='video/mp4' />
              </video>
            </div>
            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                <div className="flex-1 overflow-hidden h-[50vh]">
                  <img
                    alt="titanium1"
                    src={explore1Img}
                    className="feature-video g-grow"
                  />
                </div>
                <div className="flex-1 overflow-hidden h-[50vh]">
                  <img
                    alt="titanium2"
                    src={explore2Img}
                    className="feature-video g-grow"
                  />
                </div>
              </div>
              <div className="feature-text-container">
              <div className="flex-1 flex-center">
                  <p className="feature-text g-text">
                    iPhone 15 Pro is {' '}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium design
                    </span>,
                    using the same alloy that spacecrafts use for missions to Mars.
                  </p>
                </div>
                <div className="flex-1 flex-center">
                  <p className="feature-text g-text">
                    Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;