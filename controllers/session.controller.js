
// const passport = require('passport');
// const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  console.log('Pasa por controlador');
  res.send('Controlador de Sessions');
};