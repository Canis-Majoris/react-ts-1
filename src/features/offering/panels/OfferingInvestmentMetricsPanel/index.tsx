import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useOffering } from '@Providers/OfferingProvider';
import useOfferingState from '@State/useOfferingState';
import { Row, Col } from '@Components/containers/shared/Grid';
import ValueCard from '@Components/UI/organisms/ValueCard';
import Space from '@Components/UI/atoms/Space';
import Typography from '@Components/UI/atoms/Typography';
import './index.less';

const { Title } = Typography;

export interface OfferingInvestmentMetricsPanelProps {
  loading: boolean;
  error: Error;
  currency: string;
  minAmount: number;
  maxAmount: number;
  raseTarget: any; //TODO
}

export const OfferingInvestmentMetricsPanel = memo(
  ({
    loading,
    currency,
    minAmount,
    maxAmount,
    raseTarget,
  }: OfferingInvestmentMetricsPanelProps) => {
    const { t } = useTranslation();

    return (
      <div className='offering-investment-metrics-panel'>
        <Row gutter={[16, 16]} className='mb-md'>
          <Col span={24}>
            <Space direction='horizontal' align='center'>
              <Title
                level={3}
                className='offering-investment-metrics-panel-title'
              >
                {t("entity_metrics")}
              </Title>
            </Space>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={24} sm={24} md={8}>
            <ValueCard
              loading={loading}
              value={currency}
              subtitle={t("offering_target_IRR")}
              overrideValue
            />
          </Col>
          <Col span={24} sm={24} md={8}>
            <ValueCard
              loading={loading}
              value={minAmount}
              subtitle={t("offering_acquisition_cost")}
            />
          </Col>
          <Col span={24} sm={24} md={8}>
            <ValueCard
              loading={loading}
              value={maxAmount}
              subtitle={t("offering_target_COC")}
              overrideValue
            />
          </Col>
        </Row>
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
    <OfferingInvestmentMetricsPanel
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
