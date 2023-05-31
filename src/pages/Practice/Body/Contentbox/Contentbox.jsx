import React, { useEffect } from "react";
import { zh_TW } from "../../../../locale/zh_TW";
import { cx } from "@emotion/css";
import { useHover } from "../../../../hooks/useHover";
import { useSpring, animated } from "@react-spring/web";
import Button from "../../../../components/Button/Button";

export default function Contentbox() {
  const [hover, isHover] = useHover();
  const [springs, api] = useSpring(() => {
    return {
      from: { y: 190 },
    };
  });

  useEffect(() => {
    if (isHover) {
      api.start({ y: 0 });
    } else {
      api.start({ y: 190 });
    }
  });

  return (
    <animated.div
      style={springs}
      ref={hover}
      className={cx(
        "cursor-pointer",
        "text-m3 brightness-90 hover:brightness-100 text-[20px] font-mono font-bold",
        "w-[800px]",
        "flex flex-col gap-3"
      )}
    >
      <div>{zh_TW.website.description}</div>
      <div>
        {zh_TW.website.features.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div className={cx("flex items-center gap-2")}>
        <div>是否開始網站教學？</div>
        <Button
          className={cx(
            "bg-m1 px-2 py-0.5",
            "rounded-sm",
            "border-t border-l border-m3"
          )}
        >
          開始教學
        </Button>
      </div>
    </animated.div>
  );
}
