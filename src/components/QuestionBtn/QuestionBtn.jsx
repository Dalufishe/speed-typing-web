import { cx } from "@emotion/css";
import React from "react";

import { AiOutlineQuestionCircle } from "react-icons/ai";

import { useTransition, animated } from "@react-spring/web";
import Button from "../Button/Button";
import { useHover } from "../../hooks/useHover";

const Question = (props) => {
  return (
    <Button className={cx("text-[16px]")}>
      <AiOutlineQuestionCircle />
    </Button>
  );
};

export default function QuestionBtn(props) {
  const [hover, isHover] = useHover();
  const transitions = useTransition(isHover, {
    from: { opacity: 0, x: 14 },
    enter: { opacity: 1, x: 4 },
    leave: { opacity: 0, x: 14 },
  });
  return (
    <div ref={hover}>
      <Button
        {...{
          end: transitions(
            (styles, item) =>
              item && (
                <animated.div style={styles}>
                  <Question display={props.display} />
                </animated.div>
              )
          ),

          ...props,
        }}
      >
        {props.children}
      </Button>
    </div>
  );
}
