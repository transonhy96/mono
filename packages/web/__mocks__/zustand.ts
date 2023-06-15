import { act } from "@testing-library/react";
import { StateCreator } from "zustand";
const { create: actualCreate } =
  jest.requireActual<typeof import("zustand")>("zustand");

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set();
// @ts-ignore
const extension = {
  subscribe: jest.fn(() => {
    return () => { };
  }),
  unsubscribe: jest.fn(),
  send: jest.fn(),
  init: jest.fn(),
  error: jest.fn(),
};
const extensionConnector = { connect: jest.fn(() => extension) };
(window as any).__REDUX_DEVTOOLS_EXTENSION__ = extensionConnector;

// when creating a store, we get its initial state, create a reset function and add it in the set
const create =
  () =>
    <S>(createState: StateCreator<S>) => {
      const store = actualCreate(createState);
      const initialState = store.getState();
      storeResetFns.add(() => store.setState(initialState, true));
      return store;
    };
// Reset all stores after each test run
afterEach(() => {
  act(() => storeResetFns.forEach((resetFn: any) => resetFn()));
});

export { create };
