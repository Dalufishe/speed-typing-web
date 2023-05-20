import { cx } from "@emotion/css";
import React from "react";
import Leftbar from "./layout/Leftbar/Leftbar";
import Main from "./layout/Main/Main";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div className={cx("text-b1", "flex", "w-screen h-screen")}>
            {/* Leftbar */}
            <div className={cx("w-[300px] min-w-[300px] h-full")}>
              <Leftbar />
            </div>
            {/* Main */}
            <div className={cx("flex-grow h-full")}>
              <Main />
            </div>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
