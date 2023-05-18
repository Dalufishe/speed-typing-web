import { css, cx } from "@emotion/css";
import React from "react";
import { BiTime, BiRun } from "react-icons/bi";
import { BsLightningCharge } from "react-icons/bs";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import Button from "../../../../components/Button/Button";

const Statusbox = ({ icon, value, unit, className }) => {
  return (
    <div
      className={cx(
        "px-5 py-4",
        "bg-d2",
        "border-[1.5px] border-m1",
        "rounded-md",
        "shadow-md",
        "flex items-center gap-2",
        "text-[20px]",
        className
      )}
    >
      <div>{icon}</div>
      <div className={cx("flex items-end gap-1")}>
        <div className={cx("font-bold")}>{value}</div>
        <div className={cx("text-[12px] italic", "translate-y-[-3px]")}>
          {unit}
        </div>
      </div>
    </div>
  );
};

export default function Status() {
  return (
    <div
      className={cx(
        "mt-5",
        "p-3",
        "h-[88px]",
        "bg-d3",
        "rounded-md",
        "shadow-md",
        "flex items-center justify-between gap-3",
        "border-[1.5px] border-m1",
        css`
          width: calc(100vw - 300px - 20px - 20px + 4px);
        `
      )}
    >
      <div className={cx("flex items-center gap-3", "text-[20px] font-mono")}>
        {/* Start */}
        <Button
          bg="m1"
          className={cx("border border-m3", "rounded-sm")}
          px={40}
          py={16}
        >
          Start
        </Button>
        {/* End */}
        <Button
          bg="m1"
          className={cx("border border-m3", "rounded-sm")}
          px={40}
          py={16}
        >
          Stop
        </Button>
      </div>
      <div className={cx("flex items-center gap-3", "text-[20px] font-mono")}>
        {/* Time remaining */}
        <Statusbox icon={<BiTime />} value={60} unit="s" />
        {/* Wpm */}
        <Statusbox icon={<RxLetterCaseCapitalize />} value={45} unit="w/m" />
        {/* Accurarcy */}
        <Statusbox icon={<BsLightningCharge />} value={94} unit="%" />
        {/* Words being written */}
        <Statusbox icon={<BiRun />} value={"||||||||||||"} className={cx()} />
      </div>
    </div>
  );
}
