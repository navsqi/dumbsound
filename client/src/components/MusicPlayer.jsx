import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

const MusicPlayer = ({ musics, playIndex }) => {
  const playlist = musics.map((music) => ({
    name: music.title,
    singer: music.artist.name,
    cover: `${process.env.REACT_APP_BASE_URL}images/${music.thumbnail}`,
    musicSrc: music.attachment,
  }));

  return (
    <div
      style={{
        height: '100px',
        width: '100%',
      }}
    >
      <ReactJkMusicPlayer
        mode="full"
        audioLists={playlist}
        defaultPlayIndex={0}
        autoPlay={false}
        showDownload={false}
        showThemeSwitch={false}
        toggleMode={false}
        responsive={false}
        glassBg={true}
        playIndex={playIndex}
        onAudioPlay={(audioInfo) => {
          if (playIndex === audioInfo.playIndex) {
            return;
          }
        }}
      />
    </div>
  );
};

export default MusicPlayer;
