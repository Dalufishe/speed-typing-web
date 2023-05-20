import { cx } from "@emotion/css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ROUTE } from "../../../../constant/route.const";

import { IoIosColorPalette } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { FaPlug } from "react-icons/fa";
import { AiFillTrophy, AiFillFire } from "react-icons/ai";
import { GiAchievement } from "react-icons/gi";

import QuestionBtn from "../../../../components/QuestionBtn/QuestionBtn";
import BackBtn from "../../../../components/BackBtn/BackBtn";
import MoreBtn from "../../../../components/MoreBtn/MoreBtn";

export default function OptionList() {
  const history = useHistory();
  const [page, setPage] = useState(1);
  return (
    <div className={cx("py-5")}>
      {/* page 1 */}
      {page === 1 && (
        <div>
          {/* Practice */}
          <QuestionBtn
            full
            py={8}
            className={"mb-4"}
            onClick={() => {
              history.push(ROUTE.practice);
            }}
          >
            <AiFillFire />
            練習
          </QuestionBtn>
          {/* Status */}
          <QuestionBtn
            full
            py={8}
            className={"mb-4"}
            onClick={() => {
              history.push(ROUTE.status);
            }}
          >
            <MdLeaderboard />
            數據
          </QuestionBtn>
          {/* Plugin */}
          <QuestionBtn
            full
            py={8}
            className={"mb-4"}
            onClick={() => {
              history.push(ROUTE.plugin);
            }}
          >
            <FaPlug />
            插件
          </QuestionBtn>
          {/* More */}
          <MoreBtn
            onClick={() => {
              setPage(2);
            }}
          >
            查看更多
          </MoreBtn>
        </div>
      )}
      {/* page 2 */}
      {page === 2 && (
        <div>
          {/* theme */}
          <QuestionBtn
            full
            py={8}
            className={"mb-4"}
            onClick={() => {
              history.push(ROUTE.theme);
            }}
          >
            <IoIosColorPalette />
            主題
          </QuestionBtn>
          {/* achievement */}
          <QuestionBtn
            full
            py={8}
            className={"mb-4"}
            onClick={() => {
              history.push(ROUTE.achievement);
            }}
          >
            <GiAchievement />
            成就
          </QuestionBtn>
          {/* leaderboard */}
          <QuestionBtn
            full
            py={8}
            className={"mb-4"}
            onClick={() => {
              history.push(ROUTE.leaderboard);
            }}
          >
            <AiFillTrophy />
            排行
          </QuestionBtn>
          {/* back */}
          <BackBtn
            onClick={() => {
              setPage(1);
            }}
          >
            返回上頁
          </BackBtn>
        </div>
      )}
    </div>
  );
}
