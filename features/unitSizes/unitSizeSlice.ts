import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { UnitSizes } from 'types/types';

interface UnitsSizeState {
  value: UnitSizes[];
}

const initialState: UnitsSizeState = {
  value: [],
};

export const unitSizesSlice = createSlice({
  name: 'unitSizes',
  initialState,
  reducers: {
    updateUnitSizes: (state, action: PayloadAction<UnitSizes[]>) => {
      state.value = action.payload;
    },
    toggleUnit: (state, action: PayloadAction<UnitSizes>) => {
      const unit = state.value.find((unit: UnitSizes) => unit._id === action.payload._id);
      if (unit) {
        unit.selected = !unit.selected;
      }
    }
  },
});

export const { updateUnitSizes, toggleUnit } = unitSizesSlice.actions;

export const selectUnitSizes = (state: RootState) => state.unitSizes.value;

export default unitSizesSlice.reducer;
