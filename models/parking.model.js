const mongoose = require('mongoose');
const parkingSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'name is required']
  },
  address: {
    type: String,
    // required: [true, 'address is required']
  },
  totalParkingSpots: {
    type: Number,
    // required: [true, 'total parking spots is required']
  },
  availableParkingSpots: {
    type: Number,
    // required: [true, 'available parking spots is required']
  },
  schedule: {
    type: String,
    default: '24 h'
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
} , {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        ret.location = doc.location.coordinates;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  });

parkingSchema.index({ "location": "2dsphere" });

const Parking = mongoose.model('Parking', parkingSchema);
module.exports = Parking;