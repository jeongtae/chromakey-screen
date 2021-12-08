import { NonCustomColorType, ColorType, HSL } from "./models";

export type AppAction =
  | { type: "HIDE_UI" }
  | { type: "SHOW_UI" }
  | { type: "SET_COLOR_TYPE"; colorType: ColorType }
  | { type: "SET_CUSTOM_COLOR_HSL"; hsl: HSL }
  | {
      type: "SET_NON_CUSTOM_COLOR_HSL_ADJ";
      colorType: NonCustomColorType;
      hslAdjustment: HSL;
    };

export function hideUI(): AppAction {
  return { type: "HIDE_UI" };
}

export function showUI(): AppAction {
  return { type: "SHOW_UI" };
}

export function setColorType(colorType: ColorType): AppAction {
  return { type: "SET_COLOR_TYPE", colorType };
}

export function setCustomColorHSL(hsl: HSL): AppAction {
  return { type: "SET_CUSTOM_COLOR_HSL", hsl };
}

export function setNonCustomColorHSLAdjustment(
  colorType: NonCustomColorType,
  hslAdjustment: HSL
): AppAction {
  return { type: "SET_NON_CUSTOM_COLOR_HSL_ADJ", colorType, hslAdjustment };
}
