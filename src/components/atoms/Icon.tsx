import React from "react";

import ICONS, { IconName } from "~/src/lib/svg-icons";
import * as classes from "./Icon.scss";

export interface IconProps {
  icon: IconName;
  size?: number | string;
}

const Icon: React.VFC<IconProps> = (props) => {
  const icon = ICONS[props.icon];
  const isSized = props.size !== undefined;

  return (
    <div
      className={[classes.container].concat(isSized ? classes.sized : []).join(" ")}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      style={{ ...(isSized && { width: props.size, height: props.size }) }}
      role="img"
      aria-label={icon.alt}
    />
  );
};

export default Icon;
