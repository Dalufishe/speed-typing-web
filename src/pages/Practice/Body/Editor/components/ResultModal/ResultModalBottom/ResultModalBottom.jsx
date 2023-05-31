import { cx } from "@emotion/css";
import React from "react";
import Button from "../../../../../../../components/Button/Button";
import { GoLinkExternal, GoDesktopDownload } from "react-icons/go";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTE } from "../../../../../../../constant/route.const";

export default function ResultModalBottom({ setOpen }) {
  const history = useHistory();

  return (
    <div className="flex justify-center gap-3">
      <Button
        onClick={() => {
          setOpen(false);
        }}
        bg="m1"
        className={cx(
          "border-t border-l border-m3",
          "rounded-md shadow-md",
          "w-[65%] h-[48px]",
          "flex justify-center items-center",
          "text-[24px]"
        )}
      >
        SPACE
      </Button>
      <Button
        onClick={() => {
          history.push(ROUTE.analysis);
        }}
        bg="m1"
        className={cx(
          "border-t border-l border-m3",
          "rounded-md shadow-md",
          "h-[48px]",
          "flex justify-center items-center",
          "text-[16px]",
          "font-bold"
        )}
      >
        <GoLinkExternal />
        更多
      </Button>
      <Button
        bg="m1"
        className={cx(
          "border-t border-l border-m3",
          "rounded-md shadow-md",
          "h-[48px]",
          "flex justify-center items-center",
          "text-[16px]",
          "font-bold"
        )}
      >
        <GoDesktopDownload />
        下載
      </Button>
    </div>
  );
}
