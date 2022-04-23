import { Types } from 'mongoose';

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
}
