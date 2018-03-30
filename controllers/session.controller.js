const passport = require('passport');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    console.log('NO HABIA EMAIL O PASSWORD')
    next(new ApiError('Email and password are required'));
  } else {
    passport.authenticate('local-auth', (error, user, message) => {
      if (error) {
        console.log('PRIMER ERROR');
        next(error);
      } else if (!user) {
        console.log('NO HABIA USUARIO');
        next(new ApiError(message, 401));
      } else {
        req.login(user, (error) => {

          if (error) {
            console.log('SEGUNDO ERROR: 500');
            next(new ApiError(error.message, 500));
          } else {
            console.log('SESION INICIADA');
            res.status(201).json(req.user);
          }
        });
      }
    })(req, res, next);
  }
};

module.exports.destroy = (req, res, next) => {
  console.log(req);
  req.logout();
  res.status(204).json();
};