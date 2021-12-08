import React from "react";

import Flex from "../atoms/Flex";
import AdjustsPanel from "./AdjustsPanel";
import ButtonsPanel from "./ButtonsPanel";

const MenuBar = () => {
  return (
    <Flex justifyContent="space-between" flexWrap="wrap-reverse" alignItems="flex-start">
      <ButtonsPanel padding="0 4px 4px 4px" />
      <AdjustsPanel padding="0 4px 4px 4px" />
    </Flex>
  );
};

export default MenuBar;
