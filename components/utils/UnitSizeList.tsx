import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  updateUnitSizes,
  toggleUnit,
  toggleClimate,
  toggleNonClimate,
  toggleParking,
} from 'features/unitSizes/unitSizeSlice';
import React, { useEffect, useState } from 'react';
import { UnitSizes } from 'types/types';
import getUnitSizes from 'utils/getUnitSizes';

function UnitSizeList() {
  const units = useAppSelector((state) => state.units.value);
  const unitSizes = useAppSelector((state) => state.unitSizes.value);
  const [parking, setParking] = useState(true);
  const [climate, setClimate] = useState(true);
  const [nonClimate, setNonClimate] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateUnitSizes(getUnitSizes(units)));
  }, [units, dispatch]);

  const handleChange = (unit: UnitSizes): undefined => {
    dispatch(toggleUnit(unit));
    return;
  };

  const handleParking = () => {
    setParking(state => !state);
    dispatch(toggleParking());
  }

  const handleClimate = () => {
    setClimate(state => !state);
    dispatch(toggleClimate());
  }

  const handleNonClimate = () => {
    setNonClimate(state => !state);
    dispatch(toggleNonClimate());
  }

  const unitSizeList =
    unitSizes.length > 0
      ? unitSizes.map((unit, index) => {
          return (
            <>
              <li key={index}>
                <input
                  type='checkbox'
                  className='mr-1'
                  checked={unit.selected}
                  onChange={() => handleChange(unit)}
                />
                {unit.dimensions.length}x{unit.dimensions.width}{' '}
                {unit?.type === 'parking' ? 'parking' : unit.climate ? 'climate' : 'non-climate'}
              </li>
            </>
          );
        })
      : null;

  return (
    <>
      <h3>Choose Units</h3>
      <ul>
        <li>
          <input
            type='checkbox'
            className='mr-1'
            checked={parking}
            onChange={handleParking}
            />
            Toggle Parking
        </li>
        <li>
          <input
            type='checkbox'
            className='mr-1'
            checked={climate}
            onChange={handleClimate}
            />
            Toggle Climate
        </li>
        <li>
          <input
            type='checkbox'
            className='mr-1'
            checked={nonClimate}
            onChange={handleNonClimate}
            />
            Toggle Non-Climate
        </li>
        {unitSizes.length > 0 && unitSizeList}</ul>
    </>
  );
}

export default UnitSizeList;
