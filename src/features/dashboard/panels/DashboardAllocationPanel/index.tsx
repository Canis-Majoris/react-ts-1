import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDashboard } from "@Providers/DashboardProvider";
import { useApp } from "@Providers/AppProvider";
import { Investment } from "@Types/investment";
import useProfilePortfolioAllocationState from "@State/useProfilePortfolioAllocationState";
import Card from "@Components/UI/molecules/Card";
import PortfolioAllocationChart from "@Components/UI/organisms/PortfolioAllocationChart";
import "./index.less";

export interface DashboardAllocationPanelProps {
  loading: boolean;
  idle: boolean;
  chartData: any;
  investments: Investment[];
  systemCurrency: string;
  showRightPanel: boolean;
}

export const DashboardAllocationPanel = memo(
  ({
    loading,
    idle,
    chartData,
    investments,
    systemCurrency,
    showRightPanel,
  }: DashboardAllocationPanelProps) => {
    const { t } = useTranslation();

    const data = useMemo(
      () =>
        chartData && investments.length > 0
          ? Object.keys(chartData).map((legalentityId: string) => ({
              key: legalentityId,
              value: chartData[legalentityId],
              label: investments.find(
                (inv) => String(inv.legalEntityId) === String(legalentityId)
              )?.title,
            }))
          : [],
      [chartData, investments]
    );

    return (
      <div className="dashboard-allocation-panel">
        <Card
          bordered={false}
          size="small"
          title={t("dashboard_overview_protfolio")}
        >
          <PortfolioAllocationChart
            loading={loading}
            data={data}
            currency={systemCurrency}
            showRightDashboardPanel={showRightPanel}
          />
        </Card>
      </div>
    );
  }
);

export default (props) => {
  const api = useApp();
  const dashboardApi = useDashboard();
  const allocationState = useProfilePortfolioAllocationState({
    userProfileIds: api.state.selectedProfileIds,
    legalEntityIds: api.state.selectedInvestmentIds,
  });

  if (!api) {
    throw new Error("No Provider detected");
  }

  return (
    <DashboardAllocationPanel
      loading={
        allocationState.isLoading || dashboardApi.isSystemCurrencyLoading
      }
      idle={allocationState.isIdle}
      chartData={allocationState.data?.data}
      investments={api.state.investments}
      systemCurrency={dashboardApi.state.systemCurrency}
      {...props}
    />
  );
};
