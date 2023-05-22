// redux
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";

// reducers

import { typing_data } from "./reducer/typing_data.rdc";
import { history_data } from "./reducer/history_data.rdc";

const reducer = combineReducers({ typing_data, history_data });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["history_data"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
const persistor = persistStore(store);

export { store, persistor };
