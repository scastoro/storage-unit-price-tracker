import { configureStore } from '@reduxjs/toolkit';

import unitsReducer from '../features/units/unitsSlice';
import facilitiesReducer from '../features/facilities/facilitiesSlice';
import unitSizesReducer from '../features/unitSizes/unitSizeSlice'

export const store = configureStore({
  reducer: { units: unitsReducer, facilities: facilitiesReducer, unitSizes: unitSizesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
