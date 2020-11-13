import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setCurrentSong,
}) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const playHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const updateTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      currentTime: current,
      duration,
    });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (direction === 'forward') {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'back') {
      setCurrentSong(songs[currentIndex - 1]);
      return;
    }
    setCurrentSong(songs[(currentIndex - 1) % songs.length]);
  };

  return (
    <div>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type='range'
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          icon={faAngleLeft}
          onClick={() => skipTrackHandler('back')}
        />
        <FontAwesomeIcon
          className='play'
          icon={isPlaying ? faPause : faPlay}
          onClick={playHandler}
        />
        <FontAwesomeIcon
          className='skip-forward'
          icon={faAngleRight}
          onClick={() => skipTrackHandler('forward')}
        />
      </div>
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={updateTimeHandler}
        onLoadedMetadata={updateTimeHandler}
      ></audio>
    </div>
  );
};

export default Player;
