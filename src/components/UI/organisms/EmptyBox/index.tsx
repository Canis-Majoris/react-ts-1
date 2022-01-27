import Icon from "@Components/UI/atoms/Icon";
import Image from "@Components/UI/atoms/Image";
import Typography from "@Components/UI/atoms/Typography";
import { CSSProperties } from "react";
import "./index.less";

export interface EmptyBox {
  image?: any;
  svg?: any;
  iconName?: string;
  title?: string;
  strong?: boolean;
  subtitle?: string;
  className?: string;
  style?: CSSProperties;
}

const { Title, Text } = Typography;

export const EmptyBox = ({
  image,
  iconName,
  title,
  strong = true,
  subtitle,
  className,
  style,
}: EmptyBox) => {
  return (
    <div className={`empty-box-wrapper w-100 ${className || ""}`} style={style}>
      <div className="empty-box-image">
        {image && <Image src={image} alt={title} preview={false} />}
        {iconName && <Icon name={iconName} className="w-100" />}
      </div>
      <div className="empty-box-title-text-wrapper">
        <Title level={5} className={`empty-box-title ${strong ? "lg" : ""}`}>
          {title}
        </Title>
        <Text type="secondary">{subtitle}</Text>
      </div>
    </div>
  );
};

export default EmptyBox;
