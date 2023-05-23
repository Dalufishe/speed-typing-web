import { cx } from "@emotion/css";
import React from "react";
import Button from "../../../../components/Button/Button";
import { AiFillGithub, AiFillSetting } from "react-icons/ai";
import { connect } from "react-redux";
import { set_notyet_popup } from "../../../../redux/action/set_notyet_popup.act";

function Optionbox({set_notyet_popup}) {
  return (
    <div className={cx("flex items-center gap-2")}>
      <a href="https://github.com/Dalufishe/speed-typing-web" target="_blank">
        <Button px={8} py={8}>
          <AiFillGithub />
        </Button>
      </a>
      <Button
        px={8}
        py={8}
        onClick={() => {
          set_notyet_popup(true);
        }}
      >
        <AiFillSetting />
      </Button>
    </div>
  );
}

const mapDispatchToProps = {
  set_notyet_popup,
};

export default connect(null, mapDispatchToProps)(Optionbox);
