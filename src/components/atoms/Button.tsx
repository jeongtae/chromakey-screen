import React, { useEffect, useRef } from "react";

import * as classes from "./Button.scss";

export interface ButtonProps {
  hotKeys?: string | string[];
  disabled?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!props.hotKeys || props.disabled) {
      return;
    }
    const loweredHotKeys = ([] as string[])
      .concat(props.hotKeys)
      .map((hotKey) => hotKey.toLowerCase());
    function handleKeypress(event: KeyboardEvent) {
      const loweredKey = event.key.toLowerCase();
      if (loweredHotKeys.includes(loweredKey)) {
        buttonRef.current?.click();
      }
    }
    window.addEventListener("keypress", handleKeypress);
    return () => {
      window.removeEventListener("keypress", handleKeypress);
    };
  }, [props.hotKeys, props.disabled]);

  return props.href === undefined ? (
    <button
      className={classes.container}
      ref={buttonRef}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  ) : (
    <a href={props.href} className={classes.container}>
      {props.children}
    </a>
  );
};

export default Button;
