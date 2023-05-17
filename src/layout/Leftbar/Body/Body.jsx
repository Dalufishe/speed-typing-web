import React from "react";
import Button from "../../../components/Button/Button";
import { cx } from "@emotion/css";
import OptionList from "./OptionList/OptionList";

export default function Body() {
  return (
    <div className="select-none">
      {/* 登入 / 註冊 */}
      <div className="flex justify-between">
        <Button px={44} py={6}>
          登入
        </Button>
        <Button px={44} py={6}>
          註冊
        </Button>
      </div>
      {/* 選擇欄 */}
      <OptionList />
    </div>
  );
}
