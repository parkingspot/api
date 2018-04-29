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
    default: 0
  },
  availableParkingSpots: {
    type: Number,
    default: 0
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
    // required:
  },
  price: {
      type: String,
      default: '0'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId
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