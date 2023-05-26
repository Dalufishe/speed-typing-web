import { cx } from "@emotion/css";
import React from "react";
import Optionbox from "./Optionbox/Optionbox";

export default function Tail() {
  return (
    <div className={cx("w-full", "flex items-center justify-between")}>
      <div className={cx("text-m3 text-[13px]")}>
        <a
          className="underline"
          href="https://discord.gg/RJkEhWmGw5"
          target="_blank"
        >
          Discord
        </a>{" "}
        ·{" "}
        <a
          className="underline"
          href="https://discord.gg/RJkEhWmGw5"
          target="_blank"
        >
          Developer
        </a>{" "}
        ·{" "}
        <a href="" className="underline" target="_blank">
          Help
        </a>
      </div>
      <Optionbox />
    </div>
  );
}
