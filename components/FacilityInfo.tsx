import React from 'react';
import { Facility } from '../types/types';

interface Props {
  facility: Facility;
}

function FacilityInfo({ facility }: Props) {
  return (
    <section className='facility-info-container'>
      <h2>{facility.name}</h2>
      <p>
        Address: {facility.address.street} {facility.address.city} {facility.address.state}{' '}
        {facility.address.country}
      </p>
      <p>Phone Number: {facility.phone}</p>
      <h3>Access Hours</h3>
      <ul>
        <li>Monday: {facility.access_hours.monday}</li>
        <li>Tuesday: {facility.access_hours.tuesday}</li>
        <li>Wednesday: {facility.access_hours.wednesday}</li>
        <li>Thursday: {facility.access_hours.thursday}</li>
        <li>Friday: {facility.access_hours.friday}</li>
        <li>Saturday: {facility.access_hours.saturday}</li>
        <li>Sunday: {facility.access_hours.sunday}</li>
      </ul>
      <h3>Office Hours</h3>
      <ul>
        <li>Monday: {facility.hours.monday}</li>
        <li>Tuesday: {facility.hours.tuesday}</li>
        <li>Wednesday: {facility.hours.wednesday}</li>
        <li>Thursday: {facility.hours.thursday}</li>
        <li>Friday: {facility.hours.friday}</li>
        <li>Saturday: {facility.hours.saturday}</li>
        <li>Sunday: {facility.hours.sunday}</li>
      </ul>
      <h3>Features</h3>
      <ul>
        {facility.features?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>Website: {facility.website}</p>
      <p>Units Url: {facility.units_url}</p>
    </section>
  );
}

export default FacilityInfo;
