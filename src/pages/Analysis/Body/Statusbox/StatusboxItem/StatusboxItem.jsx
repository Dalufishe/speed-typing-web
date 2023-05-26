import { cx } from "@emotion/css";
import React from "react";

export default function StatusboxItem({
  icon,
  title,
  subtitle,
  children,
  unit,
  extend = [],
}) {
  return (
    <div className={cx("w-[50%] xl:w-[25%] h-full")}>
      <div className="px-3 pb-6 xl:pb-0">
        {/* Top */}
        <div>
          {/* title */}
          <div className={cx("flex items-center gap-2")}>
            <div className="flex items-center gap-1">
              <span className="text-blue-400">{icon}</span>
              <span className="font-bold whitespace-nowrap">{title}</span>
            </div>
            <span className="text-[12px]">{subtitle}</span>
          </div>
          {/* divider */}
          <div className={cx("w-full h-0.5", "bg-m2")}></div>
        </div>
        {/* Center */}
        <div>
          {/* content */}
          <div className={cx("py-3", "flex items-center gap-3")}>
            <span className={cx("text-[40px] text-blue-400")}>{children}</span>
            <span className={cx("text-[30px]")}>{unit}</span>
          </div>
          {/* divider */}
          <div className={cx("w-full h-0.5", "bg-m2")}></div>
        </div>
        {/* Bottom List */}
        <div>
          {extend.map(({ name, value, unit }) => (
            <div key={Math.random()}>
              <div className="pt-1 w-full flex items-center justify-between">
                <span>{name}</span>
                <span>
                  {value} {unit}
                </span>
              </div>
              <div className={cx("w-full h-0.5", "bg-m2")}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
