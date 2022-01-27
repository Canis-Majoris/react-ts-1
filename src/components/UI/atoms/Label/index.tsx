import { ReactNode } from "react";
import Typography from "@Components/UI/atoms/Typography";
import "./index.less";
import { TextProps } from "antd/lib/typography/Text";

interface Props extends TextProps {
  children: ReactNode;
  className: string;
}

const { Text } = Typography;

const Label = ({ children, className, ...rest }: Props) => (
  <Text strong className={`label ${className}`} {...rest}>
    {children}
  </Text>
);

export default Label;
