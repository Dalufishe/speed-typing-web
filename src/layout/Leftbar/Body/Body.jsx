import React from "react";
import Button from "../../../components/Button/Button";
import { cx } from "@emotion/css";
import OptionList from "./OptionList/OptionList";
import { connect } from "react-redux";
import { set_notyet_popup } from "../../../redux/action/set_notyet_popup.act";

function Body({ set_notyet_popup }) {
  return (
    <div className="select-none">
      {/* 登入 / 註冊 */}
      <div className="flex justify-between">
        <Button
          px={44}
          py={6}
          onClick={() => {
            set_notyet_popup(true);
          }}
        >
          登入
        </Button>
        <Button
          px={44}
          py={6}
          onClick={() => {
            set_notyet_popup(true);
          }}
        >
          註冊
        </Button>
      </div>
      {/* 選擇欄 */}
      <OptionList />
    </div>
  );
}

const mapDispatchToProps = {
  set_notyet_popup,
};

export default connect(null, mapDispatchToProps)(Body);
