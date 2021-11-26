import React, { FC, MouseEventHandler, useEffect, useRef } from "react";

import * as classes from "./MenuButton.scss";

const MenuButton: FC<{
  firingKeys: string | string[];
  displayKeys?: string | string[];
  text: string;
  onClick?: MouseEventHandler;
}> = (props) => {
  const firingKeys = ([] as string[]).concat(props.firingKeys);
  const displayKeys =
    props.displayKeys === undefined
      ? firingKeys.map((key) => key.toUpperCase())
      : ([] as string[]).concat(props.displayKeys);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeypress({ key }: KeyboardEvent) {
      const loweredKey = key.toLowerCase();
      const loweredFiringKeys = firingKeys.map((k) => k.toLowerCase());
      if (loweredFiringKeys.includes(loweredKey)) {
        rootRef.current?.click();
      }
    }
    window.addEventListener("keypress", handleKeypress);
    return () => {
      window.removeEventListener("keypress", handleKeypress);
    };
  }, []);

  return (
    <div className={classes.menuButton} onClick={props.onClick} ref={rootRef}>
      {displayKeys.map((key) => (
        <kbd key={key}>{key}</kbd>
      ))}
      <label>{props.text}</label>
    </div>
  );
};

export default MenuButton;
