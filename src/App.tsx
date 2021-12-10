import React from "react";
import { useSelector } from "react-redux";
import Color from "color";

import { AppState } from "./store";
import MainPage from "./pages/MainPage";
import "./App.scss";

const App: React.VFC = () => {
  const currentColorHex = useSelector((state: AppState) => state.currentCalculatedColorHex);

  document.body.style.backgroundColor = currentColorHex;

  return <MainPage />;
};

export default App;
