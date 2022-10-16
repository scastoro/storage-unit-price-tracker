import { Types } from 'mongoose';
import { ChartDataset } from 'chart.js';

export interface Unit {
  dimensions: {
    length: number;
    width: number;
  };
  price: number;
  climate: boolean;
  promotion?: string;
  description?: string[];
  type?: 'self storage' | 'parking' | 'RV';
  size?: 'small' | 'medium' | 'large' | 'extra large';
  amount_left?: string;
  facility: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
  _id: string;
}

export interface UnitSizes {
  dimensions: {
    length: number;
    width: number
  };
  climate: boolean;
  selected: boolean;
  type?: 'self storage' | 'parking' | 'RV';
  _id: string;
}

export interface FacilityHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Facility {
  name: string;
  address: {
    street: string;
    city: string;
    postal_code: number;
    state: string;
    country: string;
    area?: string;
    lat?: number;
    long?: number;
  };
  phone: string;
  hours: FacilityHours;
  access_hours: FacilityHours;
  features?: string[];
  website: string;
  units_url?: string;
  _id?: string;
}

export interface UnitFormat extends ChartDataset<'line', { x: string | undefined; y: number }[]> {
  climate: boolean;
}

export interface TableUnit {
  name?: string;
  climate?: boolean;
  [key: string]: number | string | boolean | undefined;
}
