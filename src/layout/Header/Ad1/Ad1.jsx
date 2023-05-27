import React from "react";
import { cx } from "@emotion/css";
import { BsServer } from "react-icons/bs";

export default function Ad1() {
  return (
    <div
      className={cx(
        "w-full h-[30px] bg-black border border-m3 border-l-0 border-r-0",
        "flex justify-center items-center"
      )}
    >
      <div className={cx("font-bold text-[16px]", "flex items-center gap-2")}>
        <a
          href="http://discordapp.com/users/520869862650937364"
          target="_blank"
          className="underline text-blue-400"
        >
          {">>>"}聯繫{"<<<"}
        </a>
        <BsServer />
        尋找一(多)位 <u>後端開發者</u> (Backend) 開發此站
        <span className={cx("text-[14px]")}>
          <u>語言不限</u> / <u>資料庫</u> / <u>socket</u> / <u>前後端分離</u>
        </span>
      </div>
    </div>
  );
}
