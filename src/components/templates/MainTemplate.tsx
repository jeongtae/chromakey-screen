import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { GITHUB_REPO_URL } from "~/src/constants";
import { AppState, showUI } from "~/src/store";
import Flex from "../atoms/Flex";
import Span from "../atoms/Span";
import IconButton from "../molecules/IconButton";
import MenuBar from "../organisms/MenuBar";
import * as classes from "./MainTemplate.scss";

const MainTemplate = () => {
  const dispatch = useDispatch();
  const colorHex = useSelector((state: AppState) => state.currentCalculatedColorHex);
  const isUIHidden = useSelector((state: AppState) => state.isUIHidden ?? false);

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
        enter: classes.uiEnter,
        enterActive: classes.uiEnterActive,
        enterDone: classes.uiEnterDone,
        exit: classes.uiExit,
        exitActive: classes.uiExitActive,
        exitDone: classes.uiExitDone,
      }}
    >
      <Flex ref={nodeRef} height="100vh" flexDirection="column" justifyContent={"space-between"}>
        <Flex padding={4}>
          <IconButton icons="24_GITHUB" href={GITHUB_REPO_URL} />
        </Flex>
        <Flex justifyContent="space-around">
          <Span color="dark">{colorHex}</Span>
        </Flex>
        <MenuBar />
      </Flex>
    </CSSTransition>
  );
};

export default MainTemplate;
