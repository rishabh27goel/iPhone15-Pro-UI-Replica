/* eslint-disable no-unused-vars */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { heroVideo, smallHeroVideo } from '../utils'

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 640 ? smallHeroVideo : heroVideo);

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcResize);

    return () => {
      window.removeEventListener('resize', handleVideoSrcResize);
    }
  }, []);

  useGSAP(() => {
    gsap.to('#hero', {
      opacity: 1,
      delay: 1.5
    });
    gsap.to('#cta', {
      opacity: 1,
      y: -50,
      delay: 2
    })
  }, []);

  const handleVideoSrcResize = () => {
    if (window.innerWidth < 640) {
      setVideoSrc(smallHeroVideo);
    }
    else {
      setVideoSrc(heroVideo);
    }
  }

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="w-full h-5/6 flex-center flex-col max-sm:mb-8">
        <p id="hero" className="hero-title"> iPhone 15 Pro </p>
        <div className="md:w-10/12 max-sm:w-7/12 w-9/12">
          <video
            key={videoSrc}
            autoPlay
            muted
            playsInline={true}
            className="pointer-events-none"
          >
            <source src={videoSrc} type='video/mp4' />
          </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-10">
        <a href="#highlights" className="btn"> Buy </a>
        <p className="font-normal text-xl">
          From &#x20B9;129800.00
        </p>
      </div>
    </section>
  );
}

export default Hero;