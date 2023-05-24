import { cx } from "@emotion/css";

import React from "react";

const Row = ({ children }) => {
  return <div className={cx("w-full h-10", "bg-m1")}>{children}</div>;
};

export default function Keyboard() {
  return (
    <div className={cx("w-full", "bg-d3", "p-4")}>
      <Row>1</Row>
      <Row>2</Row>
      <Row>3</Row>
      <Row>4</Row>
      <Row>5</Row>
    </div>
  );
}
