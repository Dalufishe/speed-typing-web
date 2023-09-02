import { cx } from "@emotion/css";
import React, { useCallback } from "react";

import { Switch, Redirect, Route } from "react-router-dom";
import Practice from "../../pages/Practice/Practice";
import { ROUTE } from "../../constant/route.const";
import Analysis from "../../pages/Analysis/Analysis";
import Login from "../../pages/Login/Login";
import { connect } from "react-redux";

function Main({ is_local_login }) {

  const handleRender = useCallback((component) => {
    return (props) => {
      // 並未登入，跳回登入頁
      if (!is_local_login) {
        props.history.push(ROUTE.login);
      }
      // 登入，載入新頁面
      return is_local_login ? component : <Login />;
    };
  },
    [is_local_login]
  );

  return (
    <div className={cx("w-full h-full", "p-5", "bg-d1")}>
      <Switch>
        <Route path={ROUTE.practice} render={handleRender(<Practice />)} />
        <Route path={ROUTE.analysis} render={handleRender(<Analysis />)} />
        <Route path={ROUTE.plugin} render={handleRender(<Analysis />)} />
        <Route path={ROUTE.theme} render={handleRender(<Analysis />)} />
        <Route path={ROUTE.achievement} render={handleRender(<Analysis />)} />
        <Route path={ROUTE.leaderboard} render={handleRender(<Analysis />)} />
        <Route path={ROUTE.login} component={Login} />
        <Redirect exact from={"/"} to={ROUTE.practice} />
        {/* {is_local_login ? (
          <Redirect exact from={"/"} to={ROUTE.practice} />
        ) : (
          <Redirect exact from={"/"} to={ROUTE.login} />
        )} */}
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    is_local_login: state.is_local_login.is_local_login,
  };
};

export default connect(mapStateToProps)(Main);
