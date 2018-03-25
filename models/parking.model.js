const mongoose = require('mongoose');
const parkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  address: {
    type: String,
    required: [true, 'address is required']
  },
  locality: {
    type: String,
    required: [true, 'locality is required']
  },
  postalCode: {
    type: String,
    default: ''
  },
  totalParkingSpots: {
    type: Number,
    required: [true, 'total parking spots is required']
  },
  availableParkingSpots: {
    type: Number,
    required: [true, 'available parking spots is required']
  },
  schedule: {
    type: String,
    default: '24 h'
  },
  longitude: {
    type: Number,
    required: [true, 'longitude is required']
  },
  latitude: {
    type: Number,
    required: [true, 'latitude is required']
  }
}
);
/*, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
}*/

const Parking = mongoose.model('Parking', parkingSchema);
module.exports = Parking;