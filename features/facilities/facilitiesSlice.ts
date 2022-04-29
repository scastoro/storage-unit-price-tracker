import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { Facility } from 'types/types';

interface FacilityState {
  value: Facility[];
}

const initialState: FacilityState = {
  value: [],
};

export const facilitySlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    updateFacilities: (state, action: PayloadAction<Facility[]>) => {
      state.value = action.payload;
    },
  },
});

export const { updateFacilities } = facilitySlice.actions;

export const selectFacilities = (state: RootState) => state.facilities.value;

export default facilitySlice.reducer;
