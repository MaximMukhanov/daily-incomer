import { configureStore } from '@reduxjs/toolkit';

const makeStore = () =>
  configureStore({
    reducer: {},
  });

export default makeStore;
