import LibraryItem from './LibraryItem';

export const Library = ({
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
}) => {
  return (
    <div className='library'>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibraryItem
            setCurrentSong={setCurrentSong}
            key={song.id}
            id={song.id}
            song={song}
            songs={songs}
            isPlaying={isPlaying}
            audioRef={audioRef}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
