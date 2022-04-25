import React from 'react';
import { Facility } from '../types/types';

interface Props {
  facility: Facility;
}

function FacilityInfo({ facility }: Props) {
  return (
    <section className='facility-info-container'>
      <h1>{facility.name}</h1>
    </section>
  );
}

export default FacilityInfo;
