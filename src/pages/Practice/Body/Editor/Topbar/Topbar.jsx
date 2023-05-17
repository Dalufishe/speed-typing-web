import { cx } from "@emotion/css";
import React from "react";

import { ImEnlarge } from "react-icons/im";
import Button from "../../../../../components/Button/Button";

export default function Topbar() {
  return (
    <div
      className={cx(
        "bg-m1",
        "rounded-sm",
        "h-full",
        "flex justify-between items-center"
      )}
    >
      {/* From left */}
      <div></div>
      {/* From Right */}
      <div>
        <Button px={6} py={6} bg="m1">
          <ImEnlarge />
        </Button>
      </div>
    </div>
  );
}
