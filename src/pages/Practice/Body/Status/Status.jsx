import { css, cx } from "@emotion/css";
import React, { useCallback, useEffect } from "react";
import { BiTime, BiRun } from "react-icons/bi";
import { BsLightningCharge } from "react-icons/bs";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import Button from "../../../../components/Button/Button";
import { connect } from "react-redux";
import { set_typing_data } from "../../../../redux/action/set_typing_data.act";

const Statusbox = ({ icon, value, unit, title, className }) => {
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
        "whitespace-nowrap",
        className
      )}
    >
      <div className="flex items-center gap-1 translate-y-[1px]">
        <div>{icon}</div>
        <div className="text-[8px]">{title} /</div>
      </div>
      <div className={cx("flex items-end gap-1")}>
        <div className={cx("font-bold")}>{value}</div>
        <div className={cx("text-[12px] italic", "translate-y-[-3px]")}>
          {unit}
        </div>
      </div>
    </div>
  );
};

function Status({ typing_data, set_typing_data, typing_data_id }) {
  const { time_remaining, wpm, accurarcy } = typing_data;
  // 倒數計時器
  useEffect(() => {
    setTimeout(() => {
      set_typing_data();
    }, 1000);
  }, [typing_data_id]);

  return (
    <div
      className={cx(
        "overflow-y-hidden",
        css`
          overflow-x: overlay;
        `,
        "mt-5",
        "p-3",
        "h-[88px]",
        "bg-d3",
        "rounded-md",
        "shadow-md",
        "flex justify-center items-center gap-3",
        "border-[1.5px] border-m1"
      )}
    >
      {/* left-box */}
      <div
        className={cx(
          "hidden lg:flex",
          "flex items-center gap-3",
          "text-[18px] font-mono"
        )}
      >
        {/* end */}
        <Button
          bg="m1"
          className={cx("border border-m3", "rounded-sm", "whitespace-nowrap")}
          px={20}
          py={16}
        >
          結束 (<span className="underline">Esc</span>)
        </Button>
      </div>
      {/* divider */}
      <div
        className={cx("hidden lg:flex", "w-[1.5px] h-full mx-3", "bg-m1")}
      ></div>
      {/* right-box */}
      <div
        className={cx(
          "justify-center lg:justify-start flex-grow lg:flex-grow-0",
          "flex items-center gap-3",
          "text-[20px] font-mono"
        )}
      >
        {/* Time remaining */}
        <Statusbox
          icon={<BiTime />}
          title={<span className="hidden lg:inline">剩餘時間</span>}
          value={time_remaining}
          unit="s"
        />
        {/* Wpm */}
        <Statusbox
          icon={<RxLetterCaseCapitalize />}
          title={<span className="hidden lg:inline">每秒字數</span>}
          value={wpm.toFixed(0)}
          unit="w/m"
        />
        {/* Accurarcy */}
        <Statusbox
          icon={<BsLightningCharge />}
          title={<span className="hidden lg:inline">精確度</span>}
          value={accurarcy}
          unit="%"
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    typing_data: state.typing_data.data,
    typing_data_id: state.typing_data._id,
  };
};

const mapDispatchToProps = {
  set_typing_data,
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
