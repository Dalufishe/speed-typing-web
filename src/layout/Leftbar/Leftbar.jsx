import { cx } from "@emotion/css";
import React from "react";
import Title from "./Title/Title";
import Tail from "./Tail/Tail";
import Body from "./Body/Body";

export default function Leftbar() {
  return (
    <div
      className={cx(
        "w-full h-full",
        "p-5",
        "bg-d3",
        "flex flex-col justify-between"
      )}
    >
      <div>
        {/* 
      - Title
        - Logo
        - Slogan
      */}
        <Title />
        {/* 
      - Body
        - Login / Register
        - Options Card
      */}
        <Body />
        {/* 
      - Tail
        - github / settings
        - powerby
      */}
      </div>
      <Tail />
    </div>
  );
}
