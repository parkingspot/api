const mongoose = require('mongoose');
const ApiError = require('../models/api-error.model');
const User = require('../models/user.model');

module.exports.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role === 'admin') {
    next();
  } else {
    next(new ApiError('Forbidden', 403));
  }
};