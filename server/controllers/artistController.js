const { artists: Artist, musics: Music } = require('../models/index');
const { appError } = require('../utils/appError');

// TODO: Get All Artist
exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.status(200).json({
      status: 'success',
      data: {
        artists,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

// TODO: Create Artist
exports.createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        artist,
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

// TODO: Update Artist
exports.updateArtist = async (req, res) => {
  try {
    const artist = await Artist.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (artist > 0) {
      const artist = await Artist.findByPk(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          artist,
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

// TODO: Delete Artist
exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (artist > 0) {
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

// TODO: Get Musics by Artist
exports.getMusicsByArtist = async (req, res) => {
  const limit = req.query.limit ? { limit: Number(req.query.limit) } : false;
  const page = req.query.page
    ? { page: Number(req.query.page) > 0 ? Number(req.query.page) : 1 }
    : false;
  const offset = page ? { offset: (Number(req.query.page) - 1) * Number(req.query.limit) } : false;
  const order = req.query.order ? req.query.order.split(':') : false;

  try {
    const musicsByArtist = await Artist.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Music,
          as: 'musics',
          attributes: ['id', 'title', 'thumbnail', 'year', 'attachment'],
          ...limit,
          ...offset,
          order: [order ? [order[0], order[1]] : ['id', 'DESC']],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.status(200).json({
      status: 'success',
      data: {
        artists: musicsByArtist,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};
