import { Reducer } from "redux";
import produce from "immer";
import Color from "color";

import chromakeyColors from "../lib/chromakey-colors";
import { AppAction } from "./actions";
import { AppState } from "./models";
import { initialState } from "./state";
import {
  HSL_ADJ_HUE_INTERVAL,
  HSL_ADJ_LIGHTNESS_INTERVAL,
  HSL_ADJ_SATURATION_INTERVAL,
} from "../constants";

export const appReducer: Reducer<AppState, AppAction> = (
  baseState = initialState,
  action
): AppState => {
  const nextState = produce(baseState!, (draft) => {
    switch (action.type) {
      case "SET_COLOR_TYPE":
        draft.currentColorType = action.colorType;
        break;

      case "SET_CUSTOM_COLOR_HSL":
        draft.customColorHSL = action.hsl;
        break;

      case "SET_NON_CUSTOM_COLOR_HSL_ADJ":
        draft.nonCustomColorHSLAdjustments[action.colorType] = action.hslAdjustment;
        break;

      case "HIDE_UI":
        draft.isUIHidden = true;
        break;

      case "SHOW_UI":
        draft.isUIHidden = false;
        break;

      default:
        break;
    }

    if (draft.currentColorType === "custom") {
      const { hue, saturation, lightness } = draft.customColorHSL;
      draft.currentCalculatedColorHex = Color([hue, saturation, lightness], "hsl")
        .hex()
        .toUpperCase();
    } else {
      const baseColorHex = chromakeyColors[draft.currentColorType];
      const baseColor = Color(baseColorHex, "hex");
      const hsl = [
        Math.round(baseColor.hue()),
        Math.round(baseColor.saturationl()),
        Math.round(baseColor.lightness()),
      ];

      const hslAdjustment = draft.nonCustomColorHSLAdjustments[draft.currentColorType];
      if (hslAdjustment) {
        hsl[0] += hslAdjustment.hue * HSL_ADJ_HUE_INTERVAL;
        hsl[1] += hslAdjustment.saturation * HSL_ADJ_SATURATION_INTERVAL;
        hsl[2] += hslAdjustment.lightness * HSL_ADJ_LIGHTNESS_INTERVAL;
      }

      const resultColor = Color(hsl, "hsl");
      const resultColorHex = resultColor.hex();
      draft.currentCalculatedColorHex = resultColorHex.toUpperCase();
    }
  });

  return nextState;
};
