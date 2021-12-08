import React from "react";
import { useSelector } from "react-redux";
import Color from "color";

import { AppState } from "./store";
import MainPage from "./pages/MainPage";
import "./App.scss";

const App: React.VFC = () => {
  const currentColorHex = useSelector((state: AppState) => state.currentCalculatedColorHex);
  const currentColorLightness = Color(currentColorHex).lightness();

  document.body.style.backgroundColor = currentColorHex;
  if (currentColorLightness > 70) {
    document.body.classList.add("shadow");
  } else {
    document.body.classList.remove("shadow");
  }

  return <MainPage />;
};

export default App;
