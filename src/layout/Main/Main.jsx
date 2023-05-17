import { cx } from "@emotion/css";
import React from "react";

import { Switch, Redirect, Route } from "react-router-dom";
import Practice from "../../pages/Practice/Practice";
import { ROUTE } from "../../constant/route.const";

export default function Main() {
  return (
    <div className={cx("w-full h-full", "p-5", "bg-d1")}>
      <Switch>
        <Route path={ROUTE.practice} component={Practice} />
        <Route path={ROUTE.theme} component={Practice} />
        <Route path={ROUTE.achievement} component={Practice} />
        <Route path={ROUTE.leaderboard} component={Practice} />
        <Redirect exact from="/" to={ROUTE.practice} />
      </Switch>
    </div>
  );
}
