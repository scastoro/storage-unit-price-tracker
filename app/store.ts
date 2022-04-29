import { configureStore } from '@reduxjs/toolkit';

import unitsReducer from '../features/units/unitsSlice';
import facilitiesReducer from '../features/facilities/facilitiesSlice';

export const store = configureStore({
  reducer: { units: unitsReducer, facilities: facilitiesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
