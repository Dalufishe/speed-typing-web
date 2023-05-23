import { cx } from "@emotion/css";
import React from "react";
import Button from "../../../../components/Button/Button";

import { AiFillGithub, AiFillSetting } from "react-icons/ai";

export default function Optionbox() {
  return (
    <div className={cx("flex items-center gap-2")}>
      <a href="https://github.com/Dalufishe/speed-typing-web" target="_blank">
        <Button px={8} py={8}>
          <AiFillGithub />
        </Button>
      </a>
      <Button px={8} py={8}>
        <AiFillSetting />
      </Button>
    </div>
  );
}
