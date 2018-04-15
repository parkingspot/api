const mongoose = require('mongoose');
const Parking = require('../models/parking.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Parking.find()
    .then(parkings => res.json(parkings))
    .catch(error => next(error));
};

module.exports.near = (req, res, next) => {
  const lng = req.params.lng;
  const lat = req.params.lat;
  console.log(lng, lat);
  // const lng = req.params.pos['lng'];
  // const lat = req.params.pos['lat'];

  Parking.find(
  {
    location:
    { $near :
      {
        $geometry: { type: "Point",  coordinates: [ lng, lat ] },
          $minDistance: 10,
          $maxDistance: 10000
      }
    }
  }).then(parkings => res.json(parkings))
    .catch(error => next(error));
};


module.exports.listByUser = (req, res, next) => {
  Parking.find({ owner: req.user._id })
    .then(parkings => res.json(parkings))
    .catch(error => next(error));
};

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Parking.findById(id)
    .then(parking => {
      if (parking) {
        res.json(parking)
      } else {
        next(new ApiError(`Parking not found`, 404));
      }
    }).catch(error => {
      next(error);
    });
};

module.exports.create = (req, res, next) => {
  console.log(req.body);

  const parking = new Parking({
      name: req.body.name,
      address: req.body.address,
      totalParkingSpots: req.body.totalParkingSpots,
      availableParkingSpots: req.body.availableParkingSpots,
      schedule: req.body.schedule,
      location: {
        coordinates: req.body.location
      },
      owner: req.user._id
    });
  parking.save()
    .then(() => {
      res.status(201).json(parking);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
};

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  Parking.findByIdAndUpdate(req.body.id, {$set: req.body}, {new: true})
    .then(updatedParking => {
      if (updatedParking) {
        res.json(updatedParking)
      } else {
        next(new ApiError(`Parking not found`, 404));
      }
    }).catch(error => {
      console.log(error);
    // if (error instanceof mongoose.Error.ValidationError) {
    //   next(new ApiError(error.message, 400, error.errors));
    // } else {
    //   next(new ApiError(error.message, 500));
    // }
  });
};

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Parking.findByIdAndRemove(id)
    .then(parking => {
      if (parking) {
        res.status(204).json()
      } else {
        next(new ApiError(`Parking not found`, 404));
      }
    }).catch(error => next(error));
};



