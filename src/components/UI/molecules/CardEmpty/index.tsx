import Icon from "@Components/UI/atoms/Icon";
import Empty, { EmptyProps } from "@Components/UI/molecules/Empty";
import "./index.less";

interface Props extends EmptyProps {
  className?: string;
  iconName?: string;
  iconWidth?: number;
}

const CardEmpty = ({
  className,
  iconWidth = 125,
  iconName,
  ...rest
}: Props) => {
  return (
    <Empty
      className={`card-empty ${className || ""}`}
      image={
        iconName && <Icon name={iconName} width={iconWidth} height="auto" />
      }
      {...rest}
    />
  );
};

export default CardEmpty;
