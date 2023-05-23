// redux
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import reduxThunk from "redux-thunk";
import storage from "redux-persist-indexeddb-storage";

// reducers

import { typing_data } from "./reducer/typing_data.rdc";
import { history_data } from "./reducer/history_data.rdc";
import { notyet_popup } from "./reducer/notyet_popup.rdc";

const reducer = combineReducers({ typing_data, history_data, notyet_popup });

const persistConfig = {
  key: "root",
   storage: storage('myDB'),
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
