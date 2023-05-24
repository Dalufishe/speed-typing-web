import { css, cx } from "@emotion/css";
import React from "react";
import Editor from "./Editor/Editor";
import Status from "./Status/Status";

import Rightbar from "./Rightbar/Rightbar";
import Keyboard from "./Keyboard/Keyboard";

export default function Body() {
  return (
    <div className={cx("pt-5", "flex gap-5")}>
      <div
        className={cx(
          "h-[800px]",
          "flex-grow",
          "flex flex-col gap-5",
          css`
            width: calc(100vw - 600px - 60px);
          `
        )}             
      >
        <Editor />
        {/* <Keyboard /> */}
        <Status />
      </div>
      <div
        className={cx(
          "hidden xl:flex",
          css`
            width: 300px;
            height: calc(100vh - 66px - 60px);
          `
        )}
      >
        <Rightbar />
      </div>
    </div>
  );
}
