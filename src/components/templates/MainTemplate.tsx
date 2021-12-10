import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Color from "color";

import { GITHUB_REPO_URL } from "~/src/constants";
import { AppState, showUI } from "~/src/store";
import Span from "../atoms/Span";
import IconButton from "../molecules/IconButton";
import MenuBar from "../organisms/MenuBar";
import * as classes from "./MainTemplate.scss";

const MainTemplate = () => {
  const dispatch = useDispatch();
  const isUIHidden = useSelector((state: AppState) => state.isUIHidden ?? false);
  const colorHex = useSelector((state: AppState) => state.currentCalculatedColorHex);
  const currentColorHex = useSelector((state: AppState) => state.currentCalculatedColorHex);
  const currentColorSaturation = Color(currentColorHex).saturationl();
  const currentColorLightness = Color(currentColorHex).lightness();
  const isDimmingNeeded =
    currentColorSaturation + currentColorLightness >= 160 || currentColorLightness >= 80;
  const isLightTextNeeded = currentColorLightness < 40;

  useEffect(() => {
    function handle() {
      dispatch(showUI());
    }
    window.addEventListener("mouseup", handle);
    window.addEventListener("touchend", handle);
    window.addEventListener("keypress", handle);
    return () => {
      window.removeEventListener("mouseup", handle);
      window.removeEventListener("touchend", handle);
      window.removeEventListener("keypress", handle);
    };
  }, []);

  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={!isUIHidden}
      timeout={200}
      unmountOnExit
      nodeRef={nodeRef}
      classNames={{
        enter: classes.mainEnter,
        enterActive: classes.mainEnterActive,
        enterDone: classes.mainEnterDone,
        exit: classes.mainExit,
        exitActive: classes.mainExitActive,
        exitDone: classes.mainExitDone,
      }}
    >
      <main className={classes.main} ref={nodeRef}>
        <div className={classes.top}>
          <IconButton icons="24_GITHUB" href={GITHUB_REPO_URL} />
        </div>
        <div className={classes.center}>
          <Span color={isLightTextNeeded ? "light" : "dark"}>{colorHex}</Span>
        </div>
        <div className={classes.bottom}>
          <MenuBar />
        </div>
        <div className={classes.dimming} style={{ opacity: isDimmingNeeded ? 1 : 0 }}>
          <div className={classes.top} />
          <div className={classes.bottom} />
        </div>
      </main>
    </CSSTransition>
  );
};

export default MainTemplate;
