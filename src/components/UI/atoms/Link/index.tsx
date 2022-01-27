import { AnchorElement } from "@Types/react-html-elements";
import { ReactNode } from "react";

interface Props extends AnchorElement {
  children: ReactNode;
  className?: string;
}

const Link = ({ children, className = 'link', ...rest }: Props) => {
  return (
    <a className={`${className}`} {...rest}>
      {children}
    </a>
  );
};

export default Link;
