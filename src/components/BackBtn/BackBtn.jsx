import React from "react";
import Button from "../Button/Button";
import { MdArrowBackIos } from "react-icons/md";

export default function BackBtn(props) {
  return (
    <Button
      {...{
        full: true,
        py: 8,
        className: "mb-4",
        start: <MdArrowBackIos />,
        ...props,
      }}
    >
      {props.children}
    </Button>
  );
}
