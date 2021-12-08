import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState, hideUI, setColorType } from "~/src/store";
import Flex, { FlexGap } from "../atoms/Flex";
import IconButton from "../molecules/IconButton";

export interface ButtonsPanelProps {
  padding: React.CSSProperties["padding"];
}

const ButtonsPanel: React.VFC<ButtonsPanelProps> = (props) => {
  const dispatch = useDispatch();
  const currentColorType = useSelector((state: AppState) => state.currentColorType);

  return (
    <Flex gap={2} padding={props.padding}>
      <IconButton
        hotKeys={"1"}
        icons="24_NO1_BG"
        text="Green"
        disabled={currentColorType === "green"}
        onClick={() => dispatch(setColorType("green"))}
      />
      <FlexGap />
      <IconButton
        hotKeys={"2"}
        icons="24_NO2_BG"
        text="Blue"
        disabled={currentColorType === "blue"}
        onClick={() => dispatch(setColorType("blue"))}
      />
      <FlexGap />
      <IconButton
        hotKeys={"3"}
        icons="24_NO3_BG"
        text="Custom"
        disabled={currentColorType === "custom"}
        onClick={() => dispatch(setColorType("custom"))}
      />
      <FlexGap />
      <IconButton
        hotKeys={"0"}
        icons="24_NO0_BG"
        text="Hide UI"
        onClick={() => dispatch(hideUI())}
      />
    </Flex>
  );
};

export default ButtonsPanel;
