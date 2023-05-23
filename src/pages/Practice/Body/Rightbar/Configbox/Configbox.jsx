import { cx } from "@emotion/css";
import React, { useEffect, useState } from "react";

import { AiTwotoneTool } from "react-icons/ai";
import { connect } from "react-redux";

const ConfigItem = connect((state) => {
  return {
    is_start: state.typing_data.data.is_start,
  };
})(({ title, options = [], onChange = () => {}, is_start}) => {

  // handle select value

  const [value, setValue] = useState(localStorage.getItem(`config-${title}`));
  useEffect(() => {
    localStorage.setItem(`config-${title}`, value);
  }, [value]);

  // handle disabled

  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (is_start) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [is_start]);

  return (
    <div
      className={cx(
        "w-full h-[82px]",
        "border-2 border-d3 border-t-0",
        "flex items-center justify-between px-2"
      )}
    >
      <p>{title}</p>
      <select
        disabled={isDisabled}
        className={cx("rounded-sm", "bg-d3", "text-b1", "px-1")}
        onChange={(evt) => {
          setValue(evt.target.value);
          onChange(evt.target.value);
        }}
        value={value}
      >
        {options.map((option) => (
          <option key={Math.random()}>{option}</option>
        ))}
      </select>
    </div>
  );
});

export default function Configbox() {
  return (
    <div>
      {/* Top */}
      <div
        className={cx(
          "w-full h-[28px]",
          "bg-d3",
          "rounded-sm",
          "text-[15px]",
          "flex justify-between items-center",
          "text-[14px]",
          "px-2"
        )}
      >
        <div className={cx("flex items-center gap-1")}>
          <AiTwotoneTool />
          <div>配置欄</div>
        </div>
      </div>
      {/* Content */}
      <div className={cx("flex-grow")}>
        {/* spanning Time */}
        <ConfigItem title="練習模式" options={["英文單字"]} />
        <ConfigItem
          onChange={(value) => {}}
          title="練習時間"
          options={["30秒", "60秒", "120秒"]}
        />
        <ConfigItem title="是否提示" options={["是", "否"]} />
        <ConfigItem title="字體大小" options={["小", "中", "大"]} />
      </div>
    </div>
  );
}
