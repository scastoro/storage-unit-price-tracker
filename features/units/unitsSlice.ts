import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { Unit } from 'types/types';

interface UnitsState {
  value: Unit[];
}

const initialState: UnitsState = {
  value: [],
};

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    updateUnits: (state, action: PayloadAction<Unit[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateUnits } = unitsSlice.actions;

export const selectUnits = (state: RootState) => state.units.value;

export default unitsSlice.reducer;
