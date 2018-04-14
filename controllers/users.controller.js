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
        user = new User(req.body);
        user.save()
          .then(() => {
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

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => next(error));
};

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, {$set: req.body})
    .then(updatedUser => {
      if (updatedUser) {
        res.json(updatedUser)
      } else {
        next(new ApiError(`User not found`, 404));
      }
    }).catch(error => {
    console.log(error);
  })
};

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then(user => {
      if (user) {
        res.status(204).json()
      } else {
        next(new ApiError(`Parking not found`, 404));
      }
    }).catch(error => next(error));
};