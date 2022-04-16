import mongoose from 'mongoose';

const FacilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Facility name is required.'],
    },
    address: {
      type: {
        street: String,
        city: String,
        postal_code: Number,
        state: String,
        country: String,
        area: String,
        lat: Number,
        long: Number,
      },
      required: [true, 'Facility address is required.'],
    },
    phone: { type: Number },
    hours: {
      type: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
      },
      required: [true, 'Facility hours are required.'],
    },
    access_hours: {
      type: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
      },
      required: [true, 'Access hours are required.'],
    },
    features: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Facility ||
  mongoose.model('Facility', FacilitySchema);
