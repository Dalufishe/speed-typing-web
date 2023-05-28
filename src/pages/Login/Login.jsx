import { cx } from "@emotion/css";
import React, { useCallback, useState } from "react";
import Button from "../../components/Button/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTE } from "../../constant/route.const";
import { connect } from "react-redux";
import { set_is_local_login } from "../../redux/action/set_is_local_login";
import PopupHint from "../../components/PopupHint/PopupHint";

function Login({ set_is_local_login }) {
  const history = useHistory();

  // Local Login
  const [isLocalLoginConfirm, setIsLocalLoginConfirm] = useState(false);
  const handleLocalLoginConfirm = useCallback((value) => {
    setIsLocalLoginConfirm(value);
  });

  const [isLocalLoinConfirmPopup, setIsLocalLoginConfirmPopup] =
    useState(false);

  const handleLocalLogin = useCallback(() => {
    if (isLocalLoginConfirm) {
      set_is_local_login(true);
      history.push(ROUTE.practice);
    } else {
      setIsLocalLoginConfirmPopup(true);
      setTimeout(() => {
        setIsLocalLoginConfirmPopup(false);
      }, 2000);
    }
  });

  return (
    <div
      className={cx(
        "w-full h-full",
        "flex justify-center items-center",
        "font-mono"
      )}
    >
      {isLocalLoinConfirmPopup && <PopupHint>請先勾選本地登入同意項</PopupHint>}
      <div
        className={cx("w-[1200px] aspect-video", "bg-d3", "rounded-lg", "flex")}
      >
        {/* Left */}
        <div className={cx("w-[66.6%] h-full", "pt-12 p-8")}>
          {/* Heading */}
          <p className={cx("text-[32px] font-bold")}>
            登入 <span className={cx("text-[20px] font-bold")}>/ Login</span>
          </p>
        </div>
        {/* Right */}
        <div className={cx("w-[33.3%] h-full", "bg-m1", "pt-12 p-8")}>
          <div className={cx("flex flex-col gap-10")}>
            {/* Heading */}
            <div>
              <p className={cx("text-[32px] font-bold")}>歡迎來到</p>
              <p className={cx("text-[32px] font-bold")}>Speed Typing Web</p>
            </div>
            {/* Content */}
            <div>
              <p className={cx("text-[16px]")}>
                Speed Typing Web
                是一款免費的線上打字測驗平台，你可以在這裡獲得最純粹的打字體驗，及大量豐富的特色功能。
              </p>
              <ul className="list-disc ml-8 mt-4 flex flex-col gap-1">
                <li>練習 - 測驗您的英文打字能力.</li>
                <li>連線 - 和其他使用者一對一競賽.</li>
                <li>分析 - 紀錄您的打字成績並分析.</li>
                <li>社群 - 官方 DC 頻道，和其他用戶交流.</li>
              </ul>
            </div>
            {/* Content2 */}
            <div>
              <p className={cx("text-[16px]")}>
                不想登入 ? <u>使用本地登入</u>
              </p>
              <ul className="list-disc ml-8 mt-4 flex flex-col gap-1">
                <li>無法使用多人連線，競賽，排行榜</li>
                <li>資料存儲於客戶端 (瀏覽器) </li>
                <li>
                  <u>注意 ! 刪除瀏覽器恐導致記錄消失</u>
                </li>
              </ul>
            </div>
            {/* Bottom */}
            <div className="flex flex-col gap-2">
              <span>
                <input
                  value={isLocalLoginConfirm}
                  type="checkbox"
                  onChange={handleLocalLoginConfirm}
                />{" "}
                <span>我已了解相關資訊及風險，請勾選。</span>
              </span>
              <Button onClick={handleLocalLogin}>本地登入</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    is_local_login: state.is_local_login.is_local_login,
  };
};

const mapDispatchToProps = {
  set_is_local_login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
