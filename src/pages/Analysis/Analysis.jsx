import React from "react";
import Body from "./Body/Body";
import { cx } from "@emotion/css";

export default function Analysis() {
  return (
    <div className={cx("w-full h-full overflow-auto")}>
      <Body />
    </div>
  );
}
