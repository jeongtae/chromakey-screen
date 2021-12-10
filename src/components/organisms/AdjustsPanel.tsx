import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Color from "color";

import * as CONST from "~/src/constants";
import { AppState, HSL, setCustomColorHSL, setNonCustomColorHSLAdjustment } from "~/src/store";
import Flex, { FlexGap } from "../atoms/Flex";
import AdjustButton from "../molecules/AdjustButton";

export interface AdjustsPanelProps {
  padding: React.CSSProperties["padding"];
}

const AdjustsPanel: React.VFC<AdjustsPanelProps> = (props) => {
  const dispatch = useDispatch();
  const isUIHidden = useSelector((state: AppState) => state.isUIHidden ?? false);
  const currentColorType = useSelector((state: AppState) => state.currentColorType);
  const currentColorHSLAdjustment: HSL | null = useSelector((state: AppState) => {
    if (state.currentColorType === "custom") {
      return null;
    }
    return (
      state.nonCustomColorHSLAdjustments[state.currentColorType] ?? {
        hue: 0,
        saturation: 0,
        lightness: 0,
      }
    );
  }, shallowEqual);
  const customColorHSL = useSelector((state: AppState) => state.customColorHSL);
  const currentColorHex = useSelector((state: AppState) => state.currentCalculatedColorHex);

  const currentColor = Color(currentColorHex);
  const currentColorHSL = [
    Math.floor(currentColor.hue()),
    Math.floor(currentColor.saturationl()),
    Math.floor(currentColor.lightness()),
  ];
  const isCustomColorMode = currentColorType === "custom";

  return (
    <Flex gap={2} padding={props.padding}>
      <AdjustButton
        value={isCustomColorMode ? customColorHSL.hue : currentColorHSL[0]}
        disabledIncrease={
          isUIHidden ||
          (isCustomColorMode ? false : currentColorHSLAdjustment!.hue >= CONST.HSL_ADJ_HUE_MAX)
        }
        disabledDecrease={
          isUIHidden ||
          (isCustomColorMode ? false : currentColorHSLAdjustment!.hue <= CONST.HSL_ADJ_HUE_MIN)
        }
        onClickIncrease={() => {
          if (isCustomColorMode) {
            dispatch(
              setCustomColorHSL({ ...customColorHSL, hue: (customColorHSL.hue + 10) % 360 })
            );
          } else if (currentColorHSLAdjustment) {
            dispatch(
              setNonCustomColorHSLAdjustment(currentColorType, {
                ...currentColorHSLAdjustment,
                hue: currentColorHSLAdjustment.hue + 1,
              })
            );
          }
        }}
        onClickDecrease={() => {
          if (isCustomColorMode) {
            dispatch(
              setCustomColorHSL({ ...customColorHSL, hue: (customColorHSL.hue - 10 + 360) % 360 })
            );
          } else if (currentColorHSLAdjustment) {
            dispatch(
              setNonCustomColorHSLAdjustment(currentColorType, {
                ...currentColorHSLAdjustment,
                hue: currentColorHSLAdjustment.hue - 1,
              })
            );
          }
        }}
        text={isCustomColorMode || currentColorHSLAdjustment?.hue === 0 ? "H" : "H*"}
        unitText="&deg;"
        increaseHotKeys={["4", "q"]}
        increaseIcons={["24_NO4_BG", "24_Q_BG"]}
        decreaseHotKeys={["7", "a"]}
        decreaseIcons={["24_NO7_BG", "24_A_BG"]}
      />
      <FlexGap />
      <AdjustButton
        value={isCustomColorMode ? customColorHSL.saturation : currentColorHSL[1]}
        disabledIncrease={
          isUIHidden ||
          (isCustomColorMode
            ? customColorHSL.saturation >= 100
            : currentColorHSLAdjustment!.saturation >= CONST.HSL_ADJ_SATURATION_MAX)
        }
        disabledDecrease={
          isUIHidden ||
          (isCustomColorMode
            ? customColorHSL.saturation <= 0
            : currentColorHSLAdjustment!.saturation <= CONST.HSL_ADJ_SATURATION_MIN)
        }
        onClickIncrease={() => {
          if (isCustomColorMode) {
            dispatch(
              setCustomColorHSL({
                ...customColorHSL,
                saturation: Math.min(100, customColorHSL.saturation + 5),
              })
            );
          } else if (currentColorHSLAdjustment) {
            dispatch(
              setNonCustomColorHSLAdjustment(currentColorType, {
                ...currentColorHSLAdjustment,
                saturation: currentColorHSLAdjustment.saturation + 1,
              })
            );
          }
        }}
        onClickDecrease={() => {
          if (isCustomColorMode) {
            dispatch(
              setCustomColorHSL({
                ...customColorHSL,
                saturation: Math.max(0, customColorHSL.saturation - 5),
              })
            );
          } else if (currentColorHSLAdjustment) {
            dispatch(
              setNonCustomColorHSLAdjustment(currentColorType, {
                ...currentColorHSLAdjustment,
                saturation: currentColorHSLAdjustment.saturation - 1,
              })
            );
          }
        }}
        text={isCustomColorMode || currentColorHSLAdjustment?.saturation === 0 ? "S" : "S*"}
        unitText="%"
        increaseHotKeys={["5", "w"]}
        increaseIcons={["24_NO5_BG", "24_W_BG"]}
        decreaseHotKeys={["8", "s"]}
        decreaseIcons={["24_NO8_BG", "24_S_BG"]}
      />
      <FlexGap />
      <AdjustButton
        value={isCustomColorMode ? customColorHSL.lightness : currentColorHSL[2]}
        disabledIncrease={
          isUIHidden ||
          (isCustomColorMode
            ? customColorHSL.lightness >= 100
            : currentColorHSLAdjustment!.lightness >= CONST.HSL_ADJ_LIGHTNESS_MAX)
        }
        disabledDecrease={
          isUIHidden ||
          (isCustomColorMode
            ? customColorHSL.lightness <= 0
            : currentColorHSLAdjustment!.lightness <= CONST.HSL_ADJ_LIGHTNESS_MIN)
        }
        onClickIncrease={() => {
          if (isCustomColorMode) {
            dispatch(
              setCustomColorHSL({
                ...customColorHSL,
                lightness: Math.min(100, customColorHSL.lightness + 5),
              })
            );
          } else if (currentColorHSLAdjustment) {
            dispatch(
              setNonCustomColorHSLAdjustment(currentColorType, {
                ...currentColorHSLAdjustment,
                lightness: currentColorHSLAdjustment.lightness + 1,
              })
            );
          }
        }}
        onClickDecrease={() => {
          if (isCustomColorMode) {
            dispatch(
              setCustomColorHSL({
                ...customColorHSL,
                lightness: Math.max(0, customColorHSL.lightness - 5),
              })
            );
          } else if (currentColorHSLAdjustment) {
            dispatch(
              setNonCustomColorHSLAdjustment(currentColorType, {
                ...currentColorHSLAdjustment,
                lightness: currentColorHSLAdjustment.lightness - 1,
              })
            );
          }
        }}
        text={isCustomColorMode || currentColorHSLAdjustment?.lightness === 0 ? "L" : "L*"}
        unitText="%"
        increaseHotKeys={["6", "e"]}
        increaseIcons={["24_NO6_BG", "24_E_BG"]}
        decreaseHotKeys={["9", "d"]}
        decreaseIcons={["24_NO9_BG", "24_D_BG"]}
      />
    </Flex>
  );
};

export default AdjustsPanel;
