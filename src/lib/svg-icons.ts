import SVG_24_A_BG from "bundle-text:~/src/assets/icon24=a-bg.svg";
import SVG_24_D_BG from "bundle-text:~/src/assets/icon24=d-bg.svg";
import SVG_24_E_BG from "bundle-text:~/src/assets/icon24=e-bg.svg";
import SVG_24_Q_BG from "bundle-text:~/src/assets/icon24=q-bg.svg";
import SVG_24_S_BG from "bundle-text:~/src/assets/icon24=s-bg.svg";
import SVG_24_W_BG from "bundle-text:~/src/assets/icon24=w-bg.svg";
import SVG_24_NO0_BG from "bundle-text:~/src/assets/icon24=no0-bg.svg";
import SVG_24_NO1_BG from "bundle-text:~/src/assets/icon24=no1-bg.svg";
import SVG_24_NO2_BG from "bundle-text:~/src/assets/icon24=no2-bg.svg";
import SVG_24_NO3_BG from "bundle-text:~/src/assets/icon24=no3-bg.svg";
import SVG_24_NO4_BG from "bundle-text:~/src/assets/icon24=no4-bg.svg";
import SVG_24_NO5_BG from "bundle-text:~/src/assets/icon24=no5-bg.svg";
import SVG_24_NO6_BG from "bundle-text:~/src/assets/icon24=no6-bg.svg";
import SVG_24_NO7_BG from "bundle-text:~/src/assets/icon24=no7-bg.svg";
import SVG_24_NO8_BG from "bundle-text:~/src/assets/icon24=no8-bg.svg";
import SVG_24_NO9_BG from "bundle-text:~/src/assets/icon24=no9-bg.svg";
import SVG_24_PLUS from "bundle-text:~/src/assets/icon24=plus.svg";
import SVG_24_MINUS from "bundle-text:~/src/assets/icon24=minus.svg";
import SVG_24_GITHUB from "bundle-text:~/src/assets/icon24=github.svg";

export type IconName =
  | "24_A_BG"
  | "24_D_BG"
  | "24_E_BG"
  | "24_Q_BG"
  | "24_S_BG"
  | "24_W_BG"
  | "24_NO0_BG"
  | "24_NO1_BG"
  | "24_NO2_BG"
  | "24_NO3_BG"
  | "24_NO4_BG"
  | "24_NO5_BG"
  | "24_NO6_BG"
  | "24_NO7_BG"
  | "24_NO8_BG"
  | "24_NO9_BG"
  | "24_PLUS"
  | "24_MINUS"
  | "24_GITHUB";

const icons: { readonly [key in IconName]: Readonly<{ svg: string; alt: string }> } = {
  "24_A_BG": { svg: SVG_24_A_BG, alt: "Keyboard key A" },
  "24_D_BG": { svg: SVG_24_D_BG, alt: "Keyboard key D" },
  "24_E_BG": { svg: SVG_24_E_BG, alt: "Keyboard key E" },
  "24_Q_BG": { svg: SVG_24_Q_BG, alt: "Keyboard key Q" },
  "24_S_BG": { svg: SVG_24_S_BG, alt: "Keyboard key S" },
  "24_W_BG": { svg: SVG_24_W_BG, alt: "Keyboard key W" },
  "24_NO0_BG": { svg: SVG_24_NO0_BG, alt: "Keyboard key 0" },
  "24_NO1_BG": { svg: SVG_24_NO1_BG, alt: "Keyboard key 1" },
  "24_NO2_BG": { svg: SVG_24_NO2_BG, alt: "Keyboard key 2" },
  "24_NO3_BG": { svg: SVG_24_NO3_BG, alt: "Keyboard key 3" },
  "24_NO4_BG": { svg: SVG_24_NO4_BG, alt: "Keyboard key 4" },
  "24_NO5_BG": { svg: SVG_24_NO5_BG, alt: "Keyboard key 5" },
  "24_NO6_BG": { svg: SVG_24_NO6_BG, alt: "Keyboard key 6" },
  "24_NO7_BG": { svg: SVG_24_NO7_BG, alt: "Keyboard key 7" },
  "24_NO8_BG": { svg: SVG_24_NO8_BG, alt: "Keyboard key 8" },
  "24_NO9_BG": { svg: SVG_24_NO9_BG, alt: "Keyboard key 9" },
  "24_PLUS": { svg: SVG_24_PLUS, alt: "Plus sign" },
  "24_MINUS": { svg: SVG_24_MINUS, alt: "Minus sign" },
  "24_GITHUB": { svg: SVG_24_GITHUB, alt: "GitHub icon" },
};

export default icons;
