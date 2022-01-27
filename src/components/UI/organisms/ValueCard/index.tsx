import { formatCurrency } from "@Utils/formatters";
import Card, { CardProps } from "@Components/UI/molecules/Card";
import Typography from "@Components/UI/atoms/Typography";
import Skeleton from "@Components/UI/molecules/Skeleton";
import "./index.less";

const { Title, Text } = Typography;

export interface ValueCardProps extends CardProps {
  value: any;
  subtitle?: any;
  overrideValue?: boolean;
  loading: boolean;
  className?: string;
  horizontal?: boolean;
  currency?: string;
  hideValueLine?: boolean;
}

const ValueCard = ({
  value,
  subtitle,
  loading,
  overrideValue,
  className,
  horizontal,
  currency,
  hideValueLine,
  ...rest
}: ValueCardProps) => {
  return (
    <Card
      bordered={false}
      className={`value-card ${horizontal ? "horizontal" : ""}${
        className ? ` ${className}` : ""
      }`}
      {...rest}
    >
      <Title
        level={4}
        className="value-card-value"
        ellipsis={{
          tooltip:
            value !== undefined
              ? !overrideValue
                ? formatCurrency(value, currency, !hideValueLine)
                : value
              : "-",
        }}
      >
        {loading ? (
          <Skeleton.Input style={{ width: 100, height: 32 }} active />
        ) : !overrideValue ? (
          formatCurrency(value, currency, !hideValueLine) || "0"
        ) : (
          value || "-"
        )}
      </Title>
      <Text
        className="value-card-subtitle"
        ellipsis={{
          tooltip: subtitle,
        }}
      >
        {subtitle}
      </Text>
    </Card>
  );
};

export default ValueCard;
