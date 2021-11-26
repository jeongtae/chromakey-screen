import React, { FC, useState, useLayoutEffect, useMemo } from "react";
import Color from "color";

import * as classes from "./App.scss";
import MenuButton from "~/src/components/MenuButton";
import { loadFromStorage, saveToStorage } from "~/src/storage";
import StorageData from "../StorageData";

const App: FC = () => {
  const initialStorageData = useMemo(() => loadFromStorage(), []);
  const [color, setColor] = useState(initialStorageData.color);
  const [hue, setHue] = useState(initialStorageData.hue);
  const [saturation, setSaturation] = useState(initialStorageData.saturation);
  const [brightness, setBrightness] = useState(initialStorageData.brightness);
  const [hidingMenu, setHidingMenu] = useState(false);

  useLayoutEffect(() => {
    const data = new StorageData({ color, hue, saturation, brightness });
    saveToStorage(data);

    document.body.style.backgroundColor = Color(color)
      .rotate(hue * 5)
      .desaturate(-saturation * 0.035)
      .darken(-brightness * 0.035)
      .hex();
  }, [color, saturation, brightness, hue]);

  return (
    <main className={classes.fullscreen} onTouchEnd={() => setHidingMenu((value) => !value)}>
      <nav
        className={classes.menuBar}
        style={{ visibility: hidingMenu ? "hidden" : "visible" }}
        onTouchEnd={(ev) => ev.stopPropagation()}
      >
        <div className={classes.menuBarGroup} style={{ flexWrap: "wrap" }}>
          <MenuButton text="Green" firingKeys="1" onClick={() => setColor("#0f0")} />
          <MenuButton text="Blue" firingKeys="2" onClick={() => setColor("#00f")} />
          <MenuButton text="Red" firingKeys="3" onClick={() => setColor("#f00")} />
        </div>
        <div className={classes.menuBarGroup}>
          <MenuButton
            text="Hue-"
            firingKeys={["7", "a"]}
            onClick={() => setHue((value) => Math.max(--value, StorageData.minHue))}
          />
          <span className={classes.numberIndicator}>{hue}</span>
          <MenuButton
            text="Hue+"
            firingKeys={["4", "q"]}
            onClick={() => setHue((value) => Math.min(++value, StorageData.maxHue))}
          />
        </div>
        <div className={classes.menuBarGroup}>
          <MenuButton
            text="Sat-"
            firingKeys={["8", "s"]}
            onClick={() => setSaturation((value) => Math.max(--value, StorageData.minSaturation))}
          />
          <span className={classes.numberIndicator}>{saturation}</span>
          <MenuButton
            text="Sat+"
            firingKeys={["5", "w"]}
            onClick={() => setSaturation((value) => Math.min(++value, StorageData.maxSaturation))}
          />
        </div>
        <div className={classes.menuBarGroup}>
          <MenuButton
            text="Brh-"
            firingKeys={["9", "d"]}
            onClick={() => setBrightness((value) => Math.max(--value, StorageData.minBrightness))}
          />
          <span className={classes.numberIndicator}>{brightness}</span>
          <MenuButton
            text="Brh+"
            firingKeys={["6", "e"]}
            onClick={() => setBrightness((value) => Math.min(++value, StorageData.maxBrightness))}
          />
        </div>
        <div className={classes.menuBarGroup}>
          <MenuButton
            text="Toggle menu hidden"
            displayKeys={["0", "space"]}
            firingKeys={["0", " ", "spacebar"]}
            onClick={() => setHidingMenu((value) => !value)}
          />
        </div>
      </nav>
    </main>
  );
};

export default App;
