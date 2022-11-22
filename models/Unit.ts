import mongoose, { Schema, Types } from 'mongoose';
import { Unit } from 'types/types';
import Facility from './Facility';

const UnitSchema = new Schema<Unit>(
  {
    dimensions: {
      type: {
        length: Number,
        width: Number,
      },
      required: [true, 'Unit must have dimensions.'],
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
    description: {
      type: [String],
    },
    type: {
      type: String,
      enum: ['self storage', 'parking', 'RV'],
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large', 'extra large'],
    },
    amount_left: {
      type: String,
    },
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Facility.modelName,
      required: [true, 'Unit must have an associated Facility.'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Unit || mongoose.model('Unit', UnitSchema);
