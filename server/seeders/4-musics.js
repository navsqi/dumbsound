'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('musics', [
      {
        title: 'Pupus',
        thumbnail: 'thumbnail5.png',
        year: '2001',
        attachment: 'https://www.bensound.com/bensound-music/bensound-memories.mp3',
        artistId: 3,
      },
      {
        title: 'Kangen',
        thumbnail: 'thumbnail4.png',
        year: '1999',
        attachment: 'https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3',
        artistId: 3,
      },
      {
        title: "It's My Life",
        thumbnail: 'thumbnail1.png',
        year: '2000',
        attachment: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
        artistId: 1,
      },
      {
        title: 'Always',
        thumbnail: 'thumbnail2.png',
        year: '2005',
        attachment: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
        artistId: 1,
      },
      {
        title: 'Broken Night',
        thumbnail: 'thumbnail3.png',
        year: '2018',
        attachment: 'https://www.bensound.com/bensound-music/bensound-summer.mp3',
        artistId: 2,
      },
      {
        title: 'Blind To You',
        thumbnail: 'thumbnail6.png',
        year: '2018',
        attachment: 'https://www.bensound.com/bensound-music/bensound-summer.mp3',
        artistId: 2,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('musics', null, {});
  },
};

// https://www.bensound.com/bensound-music/bensound-summer.mp3
// https://www.bensound.com/bensound-music/bensound-ukulele.mp3
// https://www.bensound.com/bensound-music/bensound-creativeminds.mp3
// https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3
// https://www.bensound.com/bensound-music/bensound-memories.mp3
