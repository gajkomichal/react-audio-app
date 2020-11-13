import { useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';

import data from './data';
import './styles/app.scss';
import Library from './components/Library';
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  return (
    <div className='App'>
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setSongs={setSongs}
      />
    </div>
  );
}

export default App;
