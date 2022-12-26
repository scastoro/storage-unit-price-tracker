import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  deSelectClimate,
  deSelectNonClimate,
  deSelectParking,
  selectClimate,
  selectNonClimate,
  selectParking,
  toggleUnit,
  updateUnitSizes,
} from 'features/unitSizes/unitSizeSlice';
import React, { useEffect, useState } from 'react';
import { UnitSizes } from 'types/types';
import getUnitSizes from 'utils/getUnitSizes';

function UnitSizeList() {
  const units = useAppSelector((state) => state.units.value);
  const unitSizes = useAppSelector((state) => state.unitSizes.value);
  const [parking, setParking] = useState(false);
  const [climate, setClimate] = useState(true);
  const [nonClimate, setNonClimate] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateUnitSizes(getUnitSizes(units)));
  }, [units, dispatch]);

  useEffect(() => {
    if (parking) {
      dispatch(selectParking());
    } else {
      dispatch(deSelectParking())
    }
  }, [parking, units, dispatch])

  useEffect(() => {
    if (climate) {
      dispatch(selectClimate());
    } else {
      dispatch(deSelectClimate())
    }
  }, [climate, units, dispatch])

  useEffect(() => {
    if (nonClimate) {
      dispatch(selectNonClimate());
    } else {
      dispatch(deSelectNonClimate())
    }
  }, [nonClimate, units, dispatch])

  const handleChange = (unit: UnitSizes) => {
    dispatch(toggleUnit(unit));
  };

  const handleParking = () => {
    setParking(state => !state);
  }

  const handleClimate = () => {
    setClimate(state => !state);
  }

  const handleNonClimate = () => {
    setNonClimate(state => !state);
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