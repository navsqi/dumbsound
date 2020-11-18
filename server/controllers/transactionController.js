const { transactions: Transaction, users: User, categories: Category } = require('../models/index');
const { appError } = require('../utils/appError');
const { Op } = require('sequelize');

// TODO: Get All Transactions
exports.getTransactions = async (req, res) => {
  const limit = req.query.limit ? { limit: Number(req.query.limit) } : false;
  const page = req.query.page
    ? { page: Number(req.query.page) > 0 ? Number(req.query.page) : 1 }
    : false;
  const offset = page ? { offset: (Number(req.query.page) - 1) * Number(req.query.limit) } : false;
  const order = req.query.order ? req.query.order.split(':') : false;

  let userId = null;

  if (req.user.role !== 'admin') {
    userId = { userId: req.user.id };
  }

  try {
    let transactions = await Transaction.findAll({
      where: userId,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'email', 'phone', 'subscribe'],
        },
      ],
      ...limit,
      ...offset,
      order: [order ? [order[0], order[1]] : ['id', 'DESC']],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        transactions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// // TODO: Get All Transaction
// exports.getTransaction = async (req, res) => {
//   try {
//     const transaction = await Transaction.findOne({
//       include: [
//         {
//           model: Category,
//           as: 'category',
//           attributes: ['id', 'name'],
//         },
//       ],
//       where: {
//         id: req.params.id,
//       },
//       attributes: {
//         exclude: ['createdAt', 'updatedAt'],
//       },
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         transaction,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: err.message,
//     });
//   }
// };

// TODO: Create a New Transaction
exports.createTransaction = async (req, res) => {
  if (req.file) req.body.attachment = req.file.filename;
  if (req.user.id) req.body.userId = req.user.id;

  try {
    const transaction = await Transaction.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// TODO: Update Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const getTransaction = await Transaction.findByPk(req.params.id);

    if (transaction > 0 && req.body.status === 'approved') {
      const user = await User.update(
        { subscribe: 1 },
        {
          where: {
            id: getTransaction.userId,
          },
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          transaction: getTransaction,
        },
      });
    } else if (transaction > 0 && req.body.status === 'cancel') {
      const user = await User.update(
        { subscribe: 0 },
        {
          where: {
            id: getTransaction.userId,
          },
        }
      );

      res.status(200).json({
        status: 'success',
        data: {
          transaction: getTransaction,
        },
      });
    } else {
      appError(res, 400, `No data matches with your request`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// TODO: Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (transaction > 0) {
      res.status(200).json({
        status: 'success',
        message: `Data with id: ${req.params.id} has been deleted successfully`,
      });
    } else {
      appError(res, 400, `No data matches with your request`);
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.checkExpired = async (req, res, next) => {
  try {
    const today = new Date(new Date().setDate(new Date().getDate() + 2));
    const transaction = await Transaction.findAll({
      where: {
        dueDate: {
          [Op.lte]: today,
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id'],
        },
      ],
      attributes: ['id'],
    });

    let userId = transaction.map((tr) => {
      return tr.user.id;
    });

    const user = await User.update(
      { subscribe: 0 },
      {
        where: {
          id: {
            [Op.in]: userId,
          },
        },
      }
    );

    if (user > 0) {
      res.status(200).json({
        status: 'success',
        message: `Transaction & user updated`,
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
