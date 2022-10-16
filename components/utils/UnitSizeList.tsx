import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateUnitSizes, toggleUnit } from 'features/unitSizes/unitSizeSlice';
import React, { useEffect } from 'react';
import { UnitSizes } from 'types/types';
import getUnitSizes from 'utils/getUnitSizes';

function UnitSizeList() {
  const units = useAppSelector((state) => state.units.value);
  const unitSizes = useAppSelector((state) => state.unitSizes.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateUnitSizes(getUnitSizes(units)));
  }, [units, dispatch]);

  const handleChange = (unit: UnitSizes): undefined => {
    dispatch(toggleUnit(unit))
    return;
  }
  const unitSizeList = unitSizes.length > 0 ? unitSizes.map((unit, index) => {
    return (
      <>
        <li key={index}>
          {unit.dimensions.length}x{unit.dimensions.width}{' '}
          {unit?.type === 'parking' ? 'parking' : unit.climate ? 'climate' : 'non-climate'}
          <input type="checkbox" name="" id="" checked={unit.selected} onChange={() => handleChange(unit)}  />
        </li>
      </>
    );
  }) : null;

  return (
    <ul>
      {unitSizes.length > 0 && unitSizeList}
    </ul>
  );
}

export default UnitSizeList;
