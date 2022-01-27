import { formatCurrency } from "@Utils/formatters";
import Typography from "@Components/UI/atoms/Typography";
import Progress, { ProgressProps } from "@Components/UI/atoms/Progress";
import Skeleton from "@Components/UI/molecules/Skeleton";
import Box, { BoxProps } from "@Components/UI/organisms/Box";
import { useUI } from "@Providers/UIProvider";
import { useMemo } from "react";
import "./index.less";

const { Title, Text } = Typography;

export interface ValueProgressPanelProps
  extends ProgressProps,
    Omit<BoxProps, "className"> {
  title?: any;
  dividend: any;
  divisor: any;
  loading?: boolean;
  className?: string;
  shade?: number;
  currency?: string;
  colorType?: "primary" | "secondary";
}

const ValueProgressPanel = ({
  title,
  dividend,
  divisor,
  percent,
  loading,
  className,
  shade,
  currency,
  colorType,
  type,
  ...rest
}: ValueProgressPanelProps) => {
  const value = `${formatCurrency(
    dividend,
    currency,
    false
  )} / ${formatCurrency(divisor, currency, false)}`;

  const { colors } = useUI();

  const color =
    !colorType || colorType === "primary"
      ? colors?.primaryColor
      : colors?.secondaryColor;

  const percentage = useMemo(() => {
    const result = Number(percent?.toFixed());
    //to avoid Infinity
    return result < 100 ? result : 100;
  }, [percent]);

  return (
    <Box className={`value-progress-panel ${className ?? ""}`} {...rest}>
      <div className="value-progress-panel-text-wrapper">
        <Text
          ellipsis={{
            tooltip: title,
          }}
          className="value-progress-panel-title"
        >
          {title}
        </Text>
        <Title
          level={5}
          className="value-progress-panel-value"
          ellipsis={{
            tooltip: value,
          }}
        >
          {loading ? (
            <Skeleton.Input style={{ width: 80, height: 24 }} active />
          ) : (
            value
          )}
        </Title>
      </div>
      <Progress
        strokeLinecap="square"
        strokeColor={color}
        percent={percentage}
        type={type}
        {...rest}
      />
    </Box>
  );
};

export default ValueProgressPanel;
