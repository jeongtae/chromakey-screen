import React, { createContext, useContext } from "react";

const FlexContext = createContext<{ gap: number | string; direction: "row" | "column" } | null>(
  null
);

export interface FlexProps
  extends Pick<
    React.CSSProperties,
    "padding" | "alignItems" | "justifyContent" | "flexWrap" | "flexDirection" | "width" | "height"
  > {
  gap?: string | number;
}

const Flex: React.FC<FlexProps> = (props) => {
  const { children, gap, ...styleProps } = props;
  const style: React.CSSProperties = {
    display: "flex",
    ...styleProps,
  };
  return (
    <FlexContext.Provider
      value={{
        gap: gap ?? 0,
        direction: props.flexDirection?.includes("column") ? "column" : "row",
      }}
    >
      <div style={style}>{children}</div>
    </FlexContext.Provider>
  );
};

export default Flex;

export interface FlexGapProps {
  size?: string | number;
}

export const FlexGap: React.VFC<FlexGapProps> = (props) => {
  const flex = useContext(FlexContext);
  const gap = flex?.gap || props.size || 0;
  const width = flex?.direction === "row" ? gap : 0;
  const height = flex?.direction === "column" ? gap : 0;
  return <div style={{ width, height }} />;
};
