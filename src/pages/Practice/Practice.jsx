import React from "react";
import Header from "../../layout/Header/Header";
import Body from "./Body/Body";
import { cx } from "@emotion/css";

export default function Practice() {
  return (
    <div className={cx("w-full h-full")}>
      <Body />
    </div>
  );
}
