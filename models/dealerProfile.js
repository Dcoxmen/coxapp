const mongoose = require('mongoose');

const DealerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  vehicles: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  dealerId: {
    type: Number,
    required: true
  },
  name: {
    type: String
  },
  vehicles: [
    {
      vehicleIds: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);