import React from "react";
import OptionList from "./OptionList/OptionList";
import LoginAndRegister from "./LoginAndRegister/LoginAndRegister";

export default function Body() {
  return (
    <div className="select-none">
      <LoginAndRegister />
      {/* 選擇欄 */}
      <OptionList />
    </div>
  );
}
