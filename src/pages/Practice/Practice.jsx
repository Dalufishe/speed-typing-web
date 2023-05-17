import React from "react";
import Header from "./Header/Header";
import Body from "./Body/Body";

import { cx } from "@emotion/css";

export default function Practice() {
  return (
    <div className={cx("w-full h-full", "flex flex-col")}>
      <div className={cx("h-[66px]")}>
        <Header />
      </div>
      <Body />
    </div>
  );
}
