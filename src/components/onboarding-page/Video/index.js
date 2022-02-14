import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import Play from '../../../assets/svg/btn-play.svg';
import AtlasDemoVideo from '../../../assets/videos/AtlasDemo.mp4';
import cn from 'classnames';
import Loader from 'react-loader-spinner';
import VideoThumbnail from '../../../assets/images/onboarding-preview.png';
import useLessonList from '../../../utils/pages/onboarding/useLessonList';
import NextVideoPreview from './NextVideoPreview';

const Video = ({
  t,
  lesson,
  role,
  nextVideoUrl,
  nextVideoTitle,
  nextVideoButtonTitle,
  getStartedButtonTitle,
  getStartedUrl,
  onShowGetStarted,
}) => {
  const videoRef = useRef();
  const videoThumbnailRef = useRef();

  const [videoIsHovered, setVideoIsHovered] = useState(false);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoIsLoading, setVideoIsLoading] = useState(true);
  const [videoIsFocused, setVideoIsFocused] = useState(false);
  const [videoHasEnded, setVideoHasEnded] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(true);

  const { addVideoToWatched } = useLessonList();

  const handlePlayVideo = () => {
    if (videoIsPlaying) {
      setVideoIsFocused(false);
      setVideoIsPlaying(false);
      videoRef.current.pause();
    } else {
      setVideoIsFocused(true);
      setVideoIsPlaying(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    // Since there are no events that we can listen to for background-image, we have to implement the load ourselves.
    // This preloads the image and in the meantime we can show a loader.

    let preloaderImg = document.createElement('img');
    videoThumbnailRef.current.classList.add('AtlasDemo__video__thumbnail--disappeared');
    preloaderImg.src = VideoThumbnail;

    preloaderImg.addEventListener('load', event => {
      if (videoThumbnailRef.current) {
        videoThumbnailRef.current.classList.remove('AtlasDemo__video__thumbnail--disappeared');
        videoThumbnailRef.current.style.backgroundImage = `url(${VideoThumbnail})`;
      }
      setImageIsLoading(false);
      preloaderImg = null;
    });

    // Similarly to background-image, we need to implement a loader until the whole video been loaded.
    // This is not intended to be possible and therefore we use this workaround.

    const xhr = new XMLHttpRequest();
    xhr.open('GET', AtlasDemoVideo, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function(oEvent) {
      const blob = new Blob([oEvent.target.response], { type: 'video/mp4' });

      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(blob);
      }

      setVideoIsLoading(false);
    };

    xhr.send();
  }, []);

  return (
    <>
      <div
        className={cn('AtlasDemo__video', { 'AtlasDemo__video--focused': videoIsFocused })}
        onMouseEnter={() => setVideoIsHovered(true)}
        onMouseLeave={() => {
          if (!videoIsFocused) {
            setVideoIsHovered(false);
          }
        }}
      >
        {(imageIsLoading || videoIsLoading) && (
          <Loader
            className="AtlasDemo__video__loader"
            type="Oval"
            color="#302ABF"
            height="100%"
            width="100%"
            timeout={0}
          />
        )}
        {videoHasEnded && (
          <>
            <div role="presentation" className="AtlasDemo__video__overlay">
              <NextVideoPreview
                t={t}
                nextVideoUrl={nextVideoUrl}
                nextVideoTitle={nextVideoTitle}
                nextVideoButtonTitle={nextVideoButtonTitle}
                getStartedButtonTitle={getStartedButtonTitle}
                getStartedUrl={getStartedUrl}
                onShowGetStarted={onShowGetStarted}
              />
            </div>
          </>
        )}
        <div
          ref={videoThumbnailRef}
          role="presentation"
          className={cn('AtlasDemo__video__thumbnail', {
            'AtlasDemo__video__thumbnail--hovered': videoIsHovered,
            'AtlasDemo__video__thumbnail--disappeared': videoIsPlaying,
          })}
          onClick={() => {
            if (!imageIsLoading && !videoIsLoading) {
              handlePlayVideo();
            }
          }}
        ></div>
        {videoIsLoading && <div className="AtlasDemo__video__hide"></div>}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          onClick={() => {
            if (!imageIsLoading && !videoIsLoading) {
              handlePlayVideo();
            }
          }}
          onEnded={() => {
            if (nextVideoUrl) {
              setVideoHasEnded(true);
            }
            setVideoIsPlaying(false);
            addVideoToWatched(lesson);
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }}
          ref={videoRef}
          muted="muted"
        ></video>
        {!imageIsLoading && !videoIsLoading && (
          <img
            role="presentation"
            onClick={() => handlePlayVideo()}
            className={cn('AtlasDemo__video__playbutton', {
              'AtlasDemo__video__playbutton--hovered': !videoHasEnded && !videoIsPlaying && videoIsHovered,
              'AtlasDemo__video__playbutton--playing': videoIsPlaying,
            })}
            src={Play}
            alt="Play button"
          />
        )}
      </div>
    </>
  );
};

export default Video;
