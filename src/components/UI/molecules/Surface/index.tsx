import { ReactNode } from "react";
import "./index.less";

interface Props {
  level: number;
  children: ReactNode;
}

const Surface = ({ level = 2, children }: Props) => (
  <div className={`surface surface-level-${level}`}>{children}</div>
);

export default Surface;
