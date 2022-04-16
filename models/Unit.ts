import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: [true, 'Unit must have a size.'],
    },
    price: {
      type: Number,
      required: [true, 'Unit must have a price.'],
    },
    climate: {
      type: Boolean,
      default: false,
    },
    promotion: {
      type: String,
    },
    features: {
      type: [String],
    },
    type: {
      type: String,
    },
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Facility',
      required: [true, 'Unit must have an associated Facility.'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Unit || mongoose.model('Unit', UnitSchema);
