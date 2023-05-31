import { css, cx } from "@emotion/css";
import React from "react";
import Editor from "./Editor/Editor";
import Status from "./Status/Status";
import Rightbar from "./Rightbar/Rightbar";
import Contentbox from "./Contentbox/Contentbox";

export default function Body() {
  return (
    <div className={cx("h-full", "pt-5", "flex gap-5")}>
      <div
        className={cx(
          "h-full",
          "flex-grow",
          "flex flex-col gap-5",
          "relative",
          css`
            width: calc(100vw - 600px - 60px);
          `
        )}
      >
        <Editor />
        <Status />
        <div className={cx("absolute bottom-0")}>
          <Contentbox />
        </div>
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
