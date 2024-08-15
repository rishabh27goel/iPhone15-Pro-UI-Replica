import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";
import { hightlightsSlides } from '../constants';
import { pauseImg, playImg, replayImg } from '../utils';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videosRef = useRef([]);
  const videosDivRef = useRef([]);
  const videosSpanRef = useRef([]);


  const [currentVideo, setCurrentVideo] = useState({
    videoId: 0,
    startPlay: false,
    isPlaying: false,
    isLastVideo: false,
    isEnd: false
  });
  const { videoId, startPlay, isPlaying, isLastVideo, isEnd } = currentVideo;
  const [loadedData, setLoadedData] = useState([]);

  useGSAP(() => {
    gsap.to('#slider', {
      translateX: `${-100 * videoId}%`,
      duration: 2,
      ease: 'power2.inOut'
    });

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none'
      },
      onComplete: () => {
        setCurrentVideo((prevState) => ({
          ...prevState,
          startPlay: true,
          isPlaying: true
        }));
      }
    });
  }, [videoId, isEnd]);

  // Handling the play of video
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videosRef.current[videoId].pause();
      }
      else {
        startPlay && videosRef.current[videoId].play()
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);

  // Handling the progress of the video
  useEffect(() => {
    let currentProgress = 0;
    let spanList = videosSpanRef.current;

    if (spanList[videoId]) {
      let animation = gsap.to(spanList[videoId], {
        onUpdate: () => {
          let progress = Math.ceil(animation.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videosDivRef.current[videoId], {
              width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
            });

            gsap.to(spanList[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white'
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videosDivRef.current[videoId], {
              width: '12px'
            });
            gsap.to(spanList[videoId], {
              backgroundColor: '#afafaf'
            });
          }
        }
      });

      if (videoId === 0) {
        animation.restart();
      }

      const animationUpdate = () => {
        animation.progress(videosRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
      }

      if (isPlaying) {
        gsap.ticker.add(animationUpdate);
      }
      else {
        gsap.ticker.remove(animationUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleLoadedMetaData = (index, e) => setLoadedData((dataState) => [...dataState, e]);

  const handleProcess = (type, index) => {
    switch (type) {
      case 'video-end':
        setCurrentVideo((prevState) => ({
          ...prevState,
          videoId: index + 1,
          isEnd: true,
        }));
        break;

      case 'video-last':
        setCurrentVideo((prevState) => ({
          ...prevState,
          isLastVideo: true
        }));
        break;

      case 'video-reset':
        setCurrentVideo((prevState) => ({
          ...prevState,
          videoId: 0,
          isLastVideo: false
        }));
        break;

      case 'play':
        setCurrentVideo((prevState) => ({
          ...prevState,
          isPlaying: !prevState.isPlaying
        }));
        break;

      case 'pause':
        setCurrentVideo((prevState) => ({
          ...prevState,
          isPlaying: !prevState.isPlaying
        }));
        break;

      default:
        return currentVideo;
    }

  }

  return (
    <>
      <div className="flex items-center">
        {
          hightlightsSlides.map((slideItem, index) => (
            <div
              id="slider"
              key={slideItem?.id}
              className="sm:pr-20 pr-10"
            >
              <div className="video-carousel-container">
                <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                  <video
                    id="video"
                    ref={(element) => videosRef.current[index] = element}
                    muted
                    preload="auto"
                    playsInline={true}
                    onPlay={() => {
                      setCurrentVideo((prevState) => ({
                        ...prevState,
                        isPlaying: true
                      }));
                    }}
                    onEnded={() => {
                      if (index !== 3) {
                        handleProcess('video-end', index);
                      }
                      else {
                        handleProcess('video-last');
                      }
                    }}
                    onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                  >
                    <source
                      src={slideItem?.video}
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="absolute top-12 left-[5%] z-10">
                  {
                    slideItem.textLists.map((text) => (
                      <p key={text} className="md:text-2xl text-xl font-medium">
                        {text}
                      </p>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {
            videosRef.current.map((_, index) => (
              <span
                key={index}
                ref={(element) => videosDivRef.current[index] = element}
                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              >
                <span
                  ref={(element) => videosSpanRef.current[index] = element}
                  className="absolute h-full w-full rounded-full"
                />
              </span>
            ))
          }
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={() => {
              if (isLastVideo)
                handleProcess('video-reset');
              else if (!isPlaying)
                handleProcess('play');
              else
                handleProcess('pause');
            }}
          />
        </button>
      </div>
    </>
  );
}

export default VideoCarousel;