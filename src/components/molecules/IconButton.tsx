import React from "react";

import { IconName } from "~/src/lib/svg-icons";
import Button, { ButtonProps } from "../atoms/Button";
import Flex, { FlexGap } from "../atoms/Flex";
import Icon from "../atoms/Icon";
import Span from "../atoms/Span";

export interface IconButtonProps
  extends Pick<ButtonProps, "hotKeys" | "onClick" | "href" | "disabled"> {
  icons: IconName | IconName[];
  text?: string;
}

const IconButton: React.VFC<IconButtonProps> = (props) => {
  const iconNames = typeof props.icons === "string" ? [props.icons] : props.icons;

  return (
    <Button
      hotKeys={props.hotKeys}
      onClick={props.onClick}
      href={props.href}
      disabled={props.disabled}
    >
      <Flex alignItems="center" flexWrap="nowrap" gap={6}>
        {iconNames.map((iconName, i) => (
          <React.Fragment key={`${i}_${iconName}`}>
            <Icon icon={iconName} />
            {i !== iconNames.length - 1 && <FlexGap />}
          </React.Fragment>
        ))}
        {props.text && (
          <>
            <FlexGap />
            <Span>{props.text}</Span>
          </>
        )}
      </Flex>
    </Button>
  );
};

export default IconButton;
