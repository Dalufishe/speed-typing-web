import { cx } from "@emotion/css";
import React from "react";

import { ImEnlarge } from "react-icons/im";
import Button from "../../../../../components/Button/Button";
import { MdDarkMode } from "react-icons/md";

export default function Topbar() {
  return (
    <div
      className={cx(
        "cursor-default",
        "bg-m1",
        "rounded-sm",
        "h-full",
        "flex justify-between items-center",
        "text-[14px]",
        "px-2"
      )}
    >
      {/* From left */}
      <div className={cx("flex items-center gap-3")}>
        {/* theme type */}
        <MdDarkMode />
        {/* difficulty */}
        <div>難度 : 易</div>
        {/* article type */}
        <div>類型 : 單字</div>
      </div>
      {/* At Center */}
      <div>
        
      </div>
      {/* From Right */}
      <div>
        {/* enlarge btn*/}
        <Button px={6} py={6} bg="m1">
          <ImEnlarge />
        </Button>
      </div>
    </div>
  );
}
