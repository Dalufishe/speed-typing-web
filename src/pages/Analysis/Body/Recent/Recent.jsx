import React from "react";
import { cx } from "@emotion/css";
import RecentItem from "./RecentItem/RecentItem";

export default function Recent() {
  return (
    <div>
      {/* Top */}
      <div
        className={cx(
          "text-[24px]",
          "mb-2",
          "flex items-center justify-between"
        )}
      >
        <p>
          最新成績 <span className="text-[16px]"> / Recent</span>
        </p>
      </div>
      {/* Content */}
      <div className="flex gap-6">
        <RecentItem title={"每分字數"} subtitle={"wpm"}></RecentItem>
        <RecentItem title={"精準度"} subtitle={"accuracy"}></RecentItem>
      </div>
    </div>
  );
}
