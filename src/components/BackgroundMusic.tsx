import React, { useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface BackgroundMusicProps {
  isPlaying: boolean;
  videoId?: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ 
  isPlaying, 
  videoId = '29lBijF33RY' // The YouTube ID you provided
}) => {
  const playerRef = useRef<any>(null);

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    // Set initial volume
    playerRef.current.setVolume(25);
    if (isPlaying) {
      playerRef.current.playVideo();
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
        // Fade in volume
        let vol = 0;
        const interval = setInterval(() => {
          vol += 2;
          if (vol >= 25) {
            playerRef.current.setVolume(25);
            clearInterval(interval);
          } else {
            playerRef.current.setVolume(vol);
          }
        }, 100);
      } else {
        // Fade out volume
        let vol = 25;
        const interval = setInterval(() => {
          vol -= 5;
          if (vol <= 0) {
            playerRef.current.setVolume(0);
            playerRef.current.pauseVideo();
            clearInterval(interval);
          } else {
            playerRef.current.setVolume(vol);
          }
        }, 100);
      }
    }
  }, [isPlaying]);

  const opts: YouTubeProps['opts'] = {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: videoId, // Required for loop to work
      modestbranding: 1,
      showinfo: 0,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
      enablejsapi: 1,
    },
  };

  return (
    <div className="fixed opacity-0 pointer-events-none -z-[9999]">
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </div>
  );
};

export default BackgroundMusic;
