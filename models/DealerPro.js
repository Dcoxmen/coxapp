const mongoose = require('mongoose');

const DealerProSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  admin: {
    type: String
  },
  dealerid: {
    type: Number
  },
  vehicleIds: [ {
      type: Number
    }
  ],
  local: {
    district: {
      type: String
    },
    districtmgr: {
      type: String
    },
    region: {
      type: String
    },
    regionmgr: {
      type: String
    },
    contact: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Dealership', DealerProSchema);