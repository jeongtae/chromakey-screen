import React from "react";

import Flex from "../atoms/Flex";
import AdjustsPanel from "./AdjustsPanel";
import ButtonsPanel from "./ButtonsPanel";

const MenuBar = () => {
  return (
    <Flex justifyContent="space-between" flexWrap="wrap" alignItems="flex-end">
      <ButtonsPanel />
      <AdjustsPanel />
    </Flex>
  );
};

export default MenuBar;
