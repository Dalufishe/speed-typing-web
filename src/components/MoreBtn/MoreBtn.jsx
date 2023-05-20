import React from "react";
import Button from "../Button/Button";
import { MdArrowForwardIos } from "react-icons/md";

export default function MoreBtn(props) {
  return (
    <Button
      {...{
        full: true,
        py: 8,
        className: "mb-4",
        end: <MdArrowForwardIos />,
        ...props,
      }}
    >
      {props.children}
    </Button>
  );
}
