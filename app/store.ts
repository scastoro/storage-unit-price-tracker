import { configureStore } from '@reduxjs/toolkit';

import unitsReducer from '../features/units/unitsSlice';

export const store = configureStore({
  reducer: { units: unitsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
