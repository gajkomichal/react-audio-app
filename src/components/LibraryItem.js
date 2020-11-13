const LibraryItem = ({
  song,
  songs,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
  id,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => audioRef.current.play());
      }
    }
  };

  return (
    <div
      className={`song ${song.active ? 'selected' : ''}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name} />
      <div className='song-desc'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibraryItem;
