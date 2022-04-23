import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

interface Units {
  name: string;
}

interface UnitsState {
  value: Units[];
}

const initialState: UnitsState = {
  value: [{ name: 'test' }],
};

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    updateUnits: (state, action: PayloadAction<Units[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateUnits } = unitsSlice.actions;

export const selectUnits = (state: RootState) => state.units.value;

export default unitsSlice.reducer;
