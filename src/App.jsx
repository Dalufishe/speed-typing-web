import { cx } from "@emotion/css";
import React from "react";
import Leftbar from "./layout/Leftbar/Leftbar";
import Main from "./layout/Main/Main";

import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
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
  );
}
