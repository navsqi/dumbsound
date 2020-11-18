const { artists: Artist, musics: Music } = require('../models/index');
const { appError } = require('../utils/appError');

// TODO: Get All Musics
exports.getMusics = async (req, res) => {
  const limit = req.query.limit ? { limit: Number(req.query.limit) } : false;
  const page = req.query.page
    ? { page: Number(req.query.page) > 0 ? Number(req.query.page) : 1 }
    : false;
  const offset = page ? { offset: (Number(req.query.page) - 1) * Number(req.query.limit) } : false;
  const order = req.query.order ? req.query.order.split(':') : false;

  try {
    const musics = await Music.findAll({
      include: [
        {
          model: Artist,
          as: 'artist',
          attributes: ['id', 'name', 'old', 'type', 'startCareer'],
        },
      ],
      ...limit,
      ...offset,
      order: [order ? [order[0], order[1]] : ['id', 'DESC']],
      attributes: {
        exclude: ['artistId', 'createdAt', 'updatedAt'],
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        musics,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// TODO: Get All Musics
exports.getMusic = async (req, res) => {
  try {
    const musics = await Music.findByPk(req.params.id, {
      include: [
        {
          model: Artist,
          as: 'artist',
          attributes: ['id', 'name', 'old', 'type', 'startCareer'],
        },
      ],
      attributes: {
        exclude: ['artistId', 'createdAt', 'updatedAt'],
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        musics,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// TODO: Create Music
exports.createMusic = async (req, res) => {
  if (req.file) req.body.thumbnail = req.file.filename;
  try {
    const music = await Music.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        music,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// TODO: Update Music
exports.updateMusic = async (req, res) => {
  try {
    const music = await Music.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (music > 0) {
      const music = await Music.findByPk(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          music,
        },
      });
    } else {
      appError(res, 400, `No data matches with your request`);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// TODO: Delete Music
exports.deleteMusic = async (req, res) => {
  try {
    const music = await Music.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (music > 0) {
      res.status(200).json({
        status: 'success',
        message: `Data with id: ${req.params.id} has been deleted successfully`,
      });
    } else {
      appError(res, 400, `No data matches with your request`);
    }
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// // TODO: Get Musics by Artist
// exports.getMusicsByArtist = async (req, res) => {
//   const limit = req.query.limit ? { limit: Number(req.query.limit) } : false;
//   const page = req.query.page
//     ? { page: Number(req.query.page) > 0 ? Number(req.query.page) : 1 }
//     : false;
//   const offset = page ? { offset: (Number(req.query.page) - 1) * Number(req.query.limit) } : false;
//   const order = req.query.order ? req.query.order.split(':') : false;

//   try {
//     const musicsByArtist = await Artist.findOne({
//       where: {
//         id: req.params.id,
//       },
//       include: [
//         {
//           model: Music,
//           as: 'musics',
//           attributes: ['id', 'title', 'thumbnail', 'year', 'attachment'],
//           ...limit,
//           ...offset,
//           order: [order ? [order[0], order[1]] : ['id', 'DESC']],
//         },
//       ],
//       attributes: {
//         exclude: ['createdAt', 'updatedAt'],
//       },
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         artists: musicsByArtist,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'error',
//       message: err.message,
//     });
//   }
// };
