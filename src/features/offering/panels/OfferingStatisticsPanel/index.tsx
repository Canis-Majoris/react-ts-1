import { memo } from "react";
import { useTranslation } from "react-i18next";
import useOfferingState from "@State/useOfferingState";
import { useOffering } from "@Providers/OfferingProvider";
import { Row, Col } from "@Components/containers/shared/Grid";
import ValueCard from "@Components/UI/organisms/ValueCard";
import "./index.less";
import Alert from "@Components/UI/atoms/Alert";

export interface OfferingStatisticsPanelProps {
  loading: boolean;
  error: Error;
  currency: string;
  minAmount: number;
  maxAmount: number;
  raseTarget: any;
}

export const OfferingStatisticsPanel = memo(
  ({
    loading,
    error,
    currency,
    minAmount,
    maxAmount,
    raseTarget,
  }: OfferingStatisticsPanelProps) => {
    const { t } = useTranslation();

    return (
      <div className="offering-statistics-panel">
        {!error ? (
          <Row gutter={[24, 24]}>
            <Col span={24} sm={12} md={6}>
              <ValueCard
                loading={loading}
                value={currency}
                subtitle={t("offering_page_currency")}
                overrideValue
              />
            </Col>
            {minAmount ? (
              <Col span={24} sm={12} md={6}>
                <ValueCard
                  loading={loading}
                  value={minAmount}
                  subtitle={t("offering_page_min_amount")}
                  currency={currency}
                  hideValueLine
                />
              </Col>
            ) : null}
            {maxAmount ? (
              <Col span={24} sm={12} md={6}>
                <ValueCard
                  loading={loading}
                  value={maxAmount}
                  subtitle={t("offering_page_max_amount")}
                  currency={currency}
                />
              </Col>
            ) : null}
            <Col span={24} sm={12} md={6}>
              <ValueCard
                loading={loading}
                value={raseTarget}
                subtitle={t("offering_page_raising")}
                currency={currency}
                hideValueLine
              />
            </Col>
          </Row>
        ) : (
          <Alert type="error" showIcon message={error?.message} />
        )}
      </div>
    );
  }
);

export default (props) => {
  const { id } = useOffering();
  const { data, isLoading, error } = useOfferingState(id);

  const {
    investmentCurrency,
    minAmountOfInvestment,
    maxAmountOfInvestment,
    capitalRaisingTarget,
  } = data?.data?.offering || {};

  return (
    <OfferingStatisticsPanel
      loading={isLoading}
      error={error}
      currency={investmentCurrency}
      minAmount={minAmountOfInvestment}
      maxAmount={maxAmountOfInvestment}
      raseTarget={capitalRaisingTarget}
      {...props}
    />
  );
};
