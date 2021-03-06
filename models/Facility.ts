import mongoose from 'mongoose';
import { FacilityHours, Facility } from 'types/types';

const FacilitySchema = new mongoose.Schema<Facility>(
  {
    name: {
      type: String,
      required: [true, 'Facility name is required.'],
    },
    address: {
      type: {
        street: {
          type: String,
          required: [true, 'Facility street address is required.'],
        },
        city: {
          type: String,
          required: [true, 'Facility address is required.'],
        },
        postal_code: {
          type: Number,
          required: [true, 'Facility address is required.'],
        },
        state: {
          type: String,
          required: [true, 'Facility address is required.'],
        },
        country: {
          type: String,
          required: [true, 'Facility address is required.'],
        },
        area: String,
        lat: Number,
        long: Number,
      },
    },
    phone: { type: String },
    hours: {
      type: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String,
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
        sunday: String,
      },
      required: [true, 'Access hours are required.'],
    },
    features: {
      type: [String],
    },
    website: {
      type: String,
    },
    units_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Facility ||
  mongoose.model('Facility', FacilitySchema);
