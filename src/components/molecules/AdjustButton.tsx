import React from "react";

import { IconName } from "~/src/lib/svg-icons";
import Icon from "../atoms/Icon";
import Span from "../atoms/Span";
import IconButton from "./IconButton";
import * as classes from "./AdjustButton.scss";

export interface AdjustButtonProps {
  value: number;
  unitText?: string;
  text: string;
  increaseHotKeys: string | string[];
  increaseIcons: IconName | IconName[];
  onClickIncrease?: React.MouseEventHandler;
  disabledIncrease?: boolean;
  decreaseHotKeys: string | string[];
  decreaseIcons: IconName | IconName[];
  onClickDecrease?: React.MouseEventHandler;
  disabledDecrease?: boolean;
}

const AdjustButton: React.VFC<AdjustButtonProps> = (props) => {
  return (
    <div className={classes.container}>
      <Icon icon="24_PLUS" />
      <IconButton
        icons={props.increaseIcons}
        hotKeys={props.increaseHotKeys}
        onClick={props.onClickIncrease}
        disabled={props.disabledIncrease}
      />
      <Span fontSize="small" fontWeight="bold">
        {props.value}
        {props.unitText && props.unitText}
      </Span>
      <Span>{props.text}</Span>
      <Icon icon="24_MINUS" />
      <IconButton
        icons={props.decreaseIcons}
        hotKeys={props.decreaseHotKeys}
        onClick={props.onClickDecrease}
        disabled={props.disabledDecrease}
      />
    </div>
  );
};

export default AdjustButton;
