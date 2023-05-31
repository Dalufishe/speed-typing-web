import { css, cx } from "@emotion/css";
import React, { useEffect, useRef } from "react";
import { BiTime } from "react-icons/bi";
import { BsLightningCharge } from "react-icons/bs";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import Button from "../../../../components/Button/Button";
import { connect } from "react-redux";
import { set_typing_data } from "../../../../redux/action/set_typing_data.act";
import { useHover } from "../../../../hooks/useHover";
import { set_history_data } from "../../../../redux/action/set_history_data.act";
import { set_is_start_PERSIST } from "../../../../redux/action/set_is_start_Persist.act";
import TypingSystem from "../../../../core/TypingSystem";

const Statusbox = ({ icon, value, unit, title, className }) => {
  const [hover, isHover] = useHover();

  return (
    <div
      ref={hover}
      className={cx(
        "cursor-default",
        "px-5 py-4",
        "bg-d2",
        "border-t border-l border-m2",
        "rounded-sm",
        "shadow-md",
        "text-[20px]",
        "whitespace-nowrap",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 translate-y-[1px]">
          <div>{icon}</div>
          <div className="text-[8px]">{title} /</div>
        </div>
        <div
          className={cx(
            "flex items-end gap-1",
            css`
              transition: scale 0.15s ease-in-out;
              scale: 1;
            `,
            isHover &&
              css`
                scale: 1.15;
              `
          )}
        >
          <div className={cx("font-bold")}>{value}</div>
          <div className={cx("text-[12px] italic", "translate-y-[-3px]")}>
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
};

function Status({
  typing_data,
  set_typing_data,
  set_history_data,
  is_start_PERSIST,
  set_is_start_PERSIST,
}) {
  const { time_remaining, wpm, accuracy, is_start } = typing_data;

  // 控制 page-reload / 中途離開 DNF
  useEffect(() => {
    // 當上次沒正常結束
    if (is_start_PERSIST) {
      let t = new TypingSystem({});
      // 生成一個假的開始時間
      t.start_time = Date.now();
      set_history_data(t); // 加入 DNF
      set_is_start_PERSIST(false);
    }
  }, []);

  const count = useRef(0);
  const timeout = useRef();
  // 倒數計時器
  useEffect(() => {
    // 更新狀態條
    if (is_start) {
      timeout.current = setTimeout(() => {
        set_typing_data();
        count.current += 1;
      }, 1000);
    }
    // 結束時，將狀態加入歷史紀錄
    else {
      if (count.current !== 0) {
        set_history_data(typing_data);
        count.current = 0;
        clearInterval(timeout.current);
      }
    }
  }, [is_start, count.current]);

  return (
    <div
      className={cx(
        "overflow-y-hidden",
        css`
          overflow-x: overlay;
        `,
        "p-3",
        "h-[88px]",
        "bg-d3",
        "rounded-sm",
        "shadow-md",
        "flex justify-center items-center gap-3",
        "border-t-2 border-l-2 border-m1"
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
          className={cx(
            "rounded-sm",
            "whitespace-nowrap",
            "border-0 border-t border-l border-m3"
          )}
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
          value={wpm.toFixed(1)}
          unit="w/m"
        />
        {/* accuracy */}
        <Statusbox
          icon={<BsLightningCharge />}
          title={<span className="hidden lg:inline">精確度</span>}
          value={accuracy}
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
    is_start_PERSIST: state.is_start_PERSIST.is_start_PERSIST,
  };
};

const mapDispatchToProps = {
  set_typing_data,
  set_history_data,
  set_is_start_PERSIST,
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
