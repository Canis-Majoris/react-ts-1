import { useUI } from "@Providers/UIProvider";
import AntdButton, { ButtonProps } from "antd/lib/button";
export { ButtonProps } from "antd/lib/button";
import "./index.less";

interface AgoraButtonProps extends ButtonProps {
  ref?: any;
}

const Button = ({
  children,
  type,
  ghost,
  disabled,
  ref,
  ...rest
}: AgoraButtonProps) => {
  const { colors } = useUI();
  const primaryColor = colors?.primaryColor;

  const isPrimary = !type || type === "primary";
  const background = isPrimary && !ghost ? primaryColor : "inherit";
  const color = ghost || type === "text" ? primaryColor : "white";
  const border = ghost ? `${primaryColor} 1px solid` : "none";
  const boxShadow = type !== "text" ? "0 2px 0 rgb(0 0 0 / 2%)" : "none";

  return (
    <AntdButton
      type={type}
      ref={ref}
      {...rest}
      disabled={disabled}
      style={
        !disabled
          ? { background, color, border, boxShadow }
          : { backgroundColor: "#f5f5f5" }
      }
    >
      {children}
    </AntdButton>
  );
};

export default Button;
