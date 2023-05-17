import { cx } from "@emotion/css";
import React from "react";
import Button from "../../../../components/Button/Button";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../../constant/route.const";

import { AiFillAppstore, AiFillTrophy, AiFillFire } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";

export default function OptionList() {
  const history = useHistory();
  console.log(history);
  return (
    <div className={cx("py-5")}>
      <Button
        full
        py={8}
        className={"mb-4"}
        onClick={() => {
          history.push(ROUTE.practice);
        }}
      >
        <AiFillFire />
        練習
      </Button>
      <Button
        full
        py={8}
        className={"mb-4"}
        onClick={() => {
          history.push(ROUTE.theme);
        }}
      >
        <AiFillAppstore />
        主題
      </Button>
      <Button
        full
        py={8}
        className={"mb-4"}
        onClick={() => {
          history.push(ROUTE.achievement);
        }}
      >
        <AiFillTrophy />
        成就
      </Button>
      <Button
        full
        py={8}
        className={"mb-4"}
        onClick={() => {
          history.push(ROUTE.leaderboard);
        }}
      >
        <MdLeaderboard />
        排行
      </Button>
    </div>
  );
}
