import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

interface UnitsState {
  value: object;
}

const initialState: UnitsState = {
  value: {},
};

export const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<object>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = unitsSlice.actions;

export const selectUnits = (state: RootState) => state.units.value;

export default unitsSlice.reducer;
