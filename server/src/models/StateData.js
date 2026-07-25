const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const stateDataSchema = new mongoose.Schema(
  {
    stateName: {
      type: String,
      required: true,
      unique: true,
    },
    cities: [
      {
        type: String,
        required: true,
      },
    ],
    cityDetails: [citySchema],
    defaultRatePerKwh: {
      type: Number,
      required: true,
      default: 7.5,
    },
    solarIrradiance: {
      type: Number, // kWh/m²/day
      required: true,
      default: 5.2,
    },
    discomName: {
      type: String,
      default: 'State Electricity Distribution Co.',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('StateData', stateDataSchema);
