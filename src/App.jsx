import { cx } from "@emotion/css";
import React, { useEffect } from "react";
import Leftbar from "./layout/Leftbar/Leftbar";
import Main from "./layout/Main/Main";
import { HashRouter as Router } from "react-router-dom";
import NotYet from "./components/NotYet/NotYet";
import { set_notyet_popup } from "./redux/action/set_notyet_popup.act";
import { connect } from "react-redux";

function App({ notyet_popup, set_notyet_popup }) {
  useEffect(() => {
    if (notyet_popup) {
      setTimeout(() => {
        set_notyet_popup(false);
      }, 1500);
    }
  }, [notyet_popup]);

  return (
    <Router>
      {notyet_popup && <NotYet />}
      <div className={cx("text-b1", "flex", "w-screen h-screen")}>
        {/* Leftbar */}
        <div
          className={cx("w-[300px] min-w-[300px] h-full", "hidden md:block")}
        >
          <Leftbar />
        </div>
        {/* Main */}
        <div className={cx("flex-grow h-full")}>
          <Main />
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    notyet_popup: state.notyet_popup.popup,
  };
};

const mapDispatchToProps = {
  set_notyet_popup,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
