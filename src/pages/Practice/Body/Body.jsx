import { cx } from "@emotion/css";
import React from "react";
import Editor from "./Editor/Editor";
import Status from "./Status/Status";

export default function Body() {
  return (
    <div className={cx("h-[600px]", "pt-5")}>
      <Editor />
      <Status />
    </div>
  );
}
