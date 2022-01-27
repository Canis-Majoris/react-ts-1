import { memo } from "react";
import { useTranslation } from "react-i18next";
import useInvestorInfoState from "@State/useInvestorInfoState";
import { useApp } from "@Providers/AppProvider";
import { Investor } from "@Types/investor";
import { Row, Col } from "@Components/containers/shared/Grid";
import ProfilesSelect from "@Components/UI/organisms/ProfilesSelect";
import InvestmentsSelect from "@Components/UI/organisms/InvestmentsSelect";
import Typography from "@Components/UI/atoms/Typography";
import Skeleton from "@Components/UI/molecules/Skeleton";
import Space from "@Components/UI/atoms/Space";
import { UserProfile } from "@Types/user-profile";
import "./index.less";

const { Title } = Typography;
export interface DashboardToolbar {
  loading: boolean;
  investor: Investor;
  profiles: UserProfile[];
}

export const DashboardToolbar = memo(
  ({ loading, investor }: DashboardToolbar) => {
    const { t } = useTranslation();

    const { firstName, lastName } = investor || {};

    const investorName = `${firstName || ""} ${lastName || ""}`;

    return (
      <div className="dashboard-toolbar">
        <Row justify="space-between" align="middle" wrap gutter={[0, 24]}>
          <Col>
            <Title level={3} className="dashboard-toolbar-title">
              {loading ? (
                <Skeleton.Input style={{ width: 200, height: 32 }} active />
              ) : (
                `${t("dashboard_overview_welcome")} ${investorName}`
              )}
            </Title>
          </Col>
          <Col>
            <Space direction="horizontal" size="large">
              <ProfilesSelect />
              <InvestmentsSelect />
            </Space>
          </Col>
        </Row>
      </div>
    );
  }
);

export default (props) => {
  const api = useApp();
  const investorInfoState = useInvestorInfoState();

  if (!api) {
    throw new Error("No Provider detected");
  }

  return (
    <DashboardToolbar
      loading={api.state.loading || investorInfoState.isLoading}
      investor={investorInfoState.data?.data}
      profiles={api.state.userProfiles}
      {...props}
    />
  );
};
