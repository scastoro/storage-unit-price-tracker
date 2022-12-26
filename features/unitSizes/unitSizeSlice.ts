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
    },
    selectUnit: (state, action: PayloadAction<UnitSizes>) => {
      const unit = state.value.find((unit: UnitSizes) => unit._id === action.payload._id);
      if (unit) {
        unit.selected = true;
      }
    },
    deSelectUnit: (state, action: PayloadAction<UnitSizes>) => {
      const unit = state.value.find((unit: UnitSizes) => unit._id === action.payload._id);
      if (unit) {
        unit.selected = false;
      }
    },
    selectParking: (state) => {
      state.value.forEach((unit) => {
        if (unit.type === 'parking') {
          unit.selected = true;
        }
      });
    },
    deSelectParking: (state) => {
      state.value.forEach((unit) => {
        if (unit.type === 'parking') {
          unit.selected = false;
        }
      });
    },
    selectClimate: (state) => {
      state.value.forEach((unit) => {
        if (unit.climate) {
          unit.selected = true;
        }
      });
    },
    deSelectClimate: (state) => {
      state.value.forEach((unit) => {
        if (unit.climate) {
          unit.selected = false;
        }
      });
    },
    selectNonClimate: (state) => {
      state.value.forEach((unit) => {
        if (!unit.climate && unit.type !== 'parking') {
          unit.selected = true;
        }
      });
    },
    deSelectNonClimate: (state) => {
      state.value.forEach((unit) => {
        if (!unit.climate && unit.type !== 'parking') {
          unit.selected = false;
        }
      });
    },
  },
});

export const {
  updateUnitSizes,
  toggleUnit,
  selectUnit,
  deSelectUnit,
  selectParking,
  deSelectParking,
  selectClimate,
  deSelectClimate,
  selectNonClimate,
  deSelectNonClimate,
} = unitSizesSlice.actions;

export const selectUnitSizes = (state: RootState) => state.unitSizes.value;

export default unitSizesSlice.reducer;
