import React from "react";

import * as classes from "./Span.scss";

export interface SpanProps {
  color?: "light" | "dark";
  fontSize?: "normal" | "small";
  fontWeight?: "regular" | "bold";
}

const Span: React.FC<SpanProps> = (props) => {
  return (
    <span
      className={[classes.container]
        .concat(props.color ? classes[props.color] : [])
        .concat(props.fontSize && props.fontSize !== "normal" ? classes[props.fontSize] : [])
        .concat(props.fontWeight && props.fontWeight !== "regular" ? classes[props.fontWeight] : [])
        .join(" ")}
    >
      {props.children}
    </span>
  );
};

export default Span;
