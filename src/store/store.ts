import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import throttle from "lodash/throttle";

import { saveStateToStorage, loadStateFromStorage } from "./state";
import { appReducer } from "./reducer";

const saveStateThrottled = throttle(saveStateToStorage, 1500, { trailing: true });

const store = createStore(
  appReducer,
  loadStateFromStorage() ?? undefined,
  process.env.NODE_ENV === "development" ? composeWithDevTools() : undefined
);

store.subscribe(() => {
  const state = store.getState();
  saveStateThrottled(state);
});

export default store;
