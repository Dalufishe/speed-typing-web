import React, { useCallback } from "react";
import Button from "../../../../components/Button/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { ROUTE } from "../../../../constant/route.const";
import { set_notyet_popup } from "../../../../redux/action/set_notyet_popup.act";
import platform from "platform";

function LoginAndRegister({ set_notyet_popup, is_local_login }) {
  const history = useHistory();
  console.log(platform);
  const handleLoginButtonName = useCallback(() => {
    if (is_local_login)
      return <div className="text-blue-400 whitespace-nowrap">本機</div>;
    else return "登入";
  }, [is_local_login]);

  return (
    <>
      {/* 登入 / 註冊 */}
      <div className="flex justify-between">
        <Button
          px={44}
          py={6}
          onClick={() => {
            history.push(ROUTE.login);
            history.go(0);
          }}
        >
          {handleLoginButtonName()}
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    is_local_login: state.is_local_login.is_local_login,
  };
};

const mapDispatchToProps = {
  set_notyet_popup,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginAndRegister);
