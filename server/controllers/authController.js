const { users: User } = require('../models/index');
const { appError } = require('../utils/appError');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

// TODO: Create token
const signToken = async (id) => {
  return await jwt.sign({ id: id }, process.env.JWT_SECRET, {
    // expires in 7 days
    expiresIn: `${30 * 24 * 60 * 60 * 1000}`,
  });
};

// TODO: Create token & send it into cookie & json
const createSendToken = async (user, statusCode, res) => {
  const token = await signToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// TODO: Register
exports.register = async function (req, res, next) {
  try {
    const users = await User.create(req.body);
    // console.log(users.get());
    if (users) {
      createSendToken(users, 201, res);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      'status': 'error',
      'message': err.message,
    });
  }
};

// TODO: Login
exports.login = async (req, res, next) => {
  // 1) check if email and password are not filled
  if (!req.body.email || !req.body.password) {
    return appError(res, 400, 'Please provide an email & password');
  }

  // 2) get user from database
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  // 3) check if user not found
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return appError(res, 400, 'Invalid email or password');
  }
  // 4) if user found, sind token
  return createSendToken(user, 200, res);
};

//TODO: Protect Middleware
exports.protect = async (req, res, next) => {
  // 1) Check if token exist
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return appError(res, 401, 'You are not logged in! Please log in to get access');
  }

  // 2) Verify token
  const verify = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user exist
  const user = await User.findOne({
    where: { id: verify.id },
  });

  if (!user) {
    return appError(res, 401, 'The user belonging this token does not exist');
  }

  req.user = user;

  next();
};

// TODO: Logout
exports.logout = async (req, res, next) => {
  // delete cookie
  res.clearCookie('jwt');
};

exports.allowTo = (...roles) => {
  return (req, res, next) => {
    // roles: ['admin', 'user']

    if (!roles.includes(req.user.role)) {
      return appError(res, 403, "You don't have permission to perform this action");
    }

    return next();
  };
};
