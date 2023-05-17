import { cx } from "@emotion/css";
import React from "react";
import Powerby from "./Powerby/Powerby";
import Optionbox from "./Optionbox/Optionbox";

export default function Tail() {
  return (
    <div className={cx("w-full", "flex justify-between")}>
      <Powerby />
      <Optionbox />
    </div>
  );
}
