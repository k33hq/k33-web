import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { researchApi } from '@/services';
import { analyticsAPI } from '@/services/analytics';

export const makeStore = () =>
  configureStore({
    reducer: {
      [researchApi.reducerPath]: researchApi.reducer,
      [analyticsAPI.reducerPath]: analyticsAPI.reducer,
    },
    middleware: (gDM) =>
      gDM().concat(researchApi.middleware, analyticsAPI.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
