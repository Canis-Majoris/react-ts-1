import AntdTag, { TagProps, CheckableTagProps } from "antd/lib/tag";
export type { TagProps, CheckableTagProps }
import "./index.less";

interface CheckTagProps extends CheckableTagProps {
  checked: boolean;
  size?: "sm" | "md" | "lg" | "full";
  width?: "auto" | "full";
  hoverable?: boolean;
  children?: JSX.Element;
}

const { CheckableTag } = AntdTag;

const Tag = AntdTag;

Tag.CheckableTag = ({ checked, size = "sm", width = "auto", hoverable, ...rest }: CheckTagProps) => (
  <CheckableTag checked={checked} className={`tag-${size} tag-width-${width} ${hoverable ? 'tag-hoverable' : ''}`} {...rest} />
);

export default Tag;
