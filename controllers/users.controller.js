const mongoose = require('mongoose');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  console.log('Inicio Controlador Create');
  // console.log(req.body);
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log('Entra en THEN');
      console.log(req.body);
      if (user) {
        next(new ApiError('User already registered', 400));
      } else {
        console.log('no existe luego lo creo')
        const user = new User(req.body);
        user.save()
          .then((user) => {
            res.json(user);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              next(new ApiError(error.message, 400, error.errors));
            } else {
              next(error);
            }
          });
      }
    }).catch(error => next(new ApiError('User already registered', 500)));
}