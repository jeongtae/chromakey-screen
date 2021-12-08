import React from "react";
import { useSelector } from "react-redux";

import { GITHUB_REPO_URL } from "~/src/constants";
import { AppState } from "~/src/store";
import Flex from "../atoms/Flex";
import Span from "../atoms/Span";
import IconButton from "../molecules/IconButton";
import MenuBar from "../organisms/MenuBar";

const MainTemplate = () => {
  const colorHex = useSelector((state: AppState) => state.currentCalculatedColorHex);

  return (
    <Flex height="100vh" flexDirection="column" justifyContent={"space-between"}>
      <Flex padding={4}>
        <IconButton icons="24_GITHUB" href={GITHUB_REPO_URL} />
      </Flex>
      <Flex justifyContent="space-around">
        <Span color="dark">{colorHex}</Span>
      </Flex>
      <MenuBar />
    </Flex>
  );
};

export default MainTemplate;
