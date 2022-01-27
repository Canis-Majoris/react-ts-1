import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightOutlined, SyncOutlined } from "@ant-design/icons";
import { useInvestmentsWithImagesState } from "@State/useInvestmentsState";
import { useApp } from "@Providers/AppProvider";
import Space from "@Components/UI/atoms/Space";
import Box, { BoxProps } from "@Components/UI/organisms/Box";
import Card, { CardProps } from "@Components/UI/molecules/Card";
import Alert from "@Components/UI/atoms/Alert";
import Button from "@Components/UI/atoms/Button";
import DashboardInvestmentsPanelContent from "./content";
import { Link } from "react-router-dom";
import EmptyBox from "@Components/UI/organisms/EmptyBox";
import Typography from "@Components/UI/atoms/Typography";
import "./index.less";

export interface DashboardInvestmentsPanelProps
  extends CardProps,
    Omit<BoxProps, "children" | "className"> {
  data?: any;
  loading?: boolean;
  fetching?: boolean;
  fetched?: boolean;
  error?: any;
}

const { Text } = Typography;

export const DashboardInvestmentsPanel = memo(
  ({
    data,
    loading,
    fetching,
    fetched,
    error,
    ...rest
  }: DashboardInvestmentsPanelProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { t, i18n } = useTranslation();

    const handleChangeItem = (newIndex: number) => {
      setSelectedIndex(newIndex);
    };

    return (
      <Box
        className={`dashboard-investments-panel ${
          loading ? "data-loading" : ""
        }`}
      >
        <Card
          loading={loading}
          bordered={false}
          title={
            <Space
              size="middle"
              align="center"
              className="dashboard-investments-panel-title"
            >
              <Text className="dashboard-investments-panel-title-text">
                {t("dashboard_protfolio_summary_investments")}
              </Text>
              {fetching && !loading && (
                <SyncOutlined
                  className="dashboard-investments-panel-title-indicator"
                  spin
                />
              )}
            </Space>
          }
          size="small"
          extra={
            data?.length > 1 && (
              <Link to="/investments">
                <Button type="text" className="color-primary font-size-sm">
                  {t("general_view_all")}{" "}
                  <ArrowRightOutlined
                    rotate={i18n.language == "he" ? 180 : 0}
                    style={{ fontSize: 12 }}
                  />
                </Button>
              </Link>
            )
          }
          {...rest}
        >
          {!error ? (
            data?.length > 0 ? (
              <DashboardInvestmentsPanelContent
                index={selectedIndex}
                loading={loading}
                investmentList={data}
                onChangeItem={handleChangeItem}
              />
            ) : (
              <EmptyBox
                iconName="no-investments-icon"
                title={t("empty_state_investments_dashboard")}
                subtitle={t("empty_state_investments_dashboard_subtitle")}
                style={{ marginTop: 55 }}
              />
            )
          ) : (
            <Alert type="error" showIcon message={error?.message} />
          )}
        </Card>
      </Box>
    );
  }
);

export default (props) => {
  const api = useApp();

  if (!api) {
    throw new Error("No Provider detected");
  }

  const investmentsState = useInvestmentsWithImagesState({
    userProfileIds: api.state.selectedProfileIds,
  });

  const investments = investmentsState?.data;
  const selectedinvestmentsIds = api.state.selectedInvestmentIds;

  const displayedInvestments = useMemo(() => {
    if (investments && selectedinvestmentsIds) {
      //@ts-ignore
      return investments.filter((inv) => {
        return selectedinvestmentsIds.includes(String(inv?.legalEntityId));
      });
    } else {
      return [];
    }
  }, [investments, selectedinvestmentsIds]);

  return (
    <DashboardInvestmentsPanel
      loading={investmentsState.isLoading}
      fetching={investmentsState.isFetching}
      fetched={investmentsState.isFetched}
      error={investmentsState.error}
      data={displayedInvestments}
      {...props}
    />
  );
};
