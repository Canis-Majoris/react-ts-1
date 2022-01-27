import { memo } from "react";
import { useTranslation } from "react-i18next";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Investment } from "@Types/investment";
import { Row, Col } from "@Components/containers/shared/Grid";
import BulletNavigation from "@Components/UI/organisms/BulletNavigation";
import Space from "@Components/UI/atoms/Space";
import Button from "@Components/UI/atoms/Button";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "@Utils/formatters";
import { useApp } from "@Providers/AppProvider";
import "./index.less";

export interface DashboarInvestmentsPanelActionsProps {
  loading?: boolean;
  onChangeItem: (index: number) => void;
  index: number;
  investmentList: Investment[];
  legalEntityId: string;
  entityType: string;
}

export const DashboarInvestmentsPanelActions = memo(
  ({
    onChangeItem,
    index,
    investmentList,
    legalEntityId,
    entityType,
  }: DashboarInvestmentsPanelActionsProps) => {
    const { t, i18n } = useTranslation();
    const appApi = useApp();

    const isHebrew = i18n.language === "he";

    const handleNavigationChange = (newIndex: number) => {
      onChangeItem && onChangeItem(newIndex);
    };

    const handlePreviousClick = () => {
      onChangeItem && onChangeItem(Math.max(0, index - 1));
    };
    const handleNextClick = () => {
      onChangeItem &&
        onChangeItem(Math.min(investmentList?.length - 1, index + 1));
    };

    //(TBD)
    return (
      <div className="dashboard-investments-panel-actions">
        <Row gutter={[16, 16]} justify="space-between">
          <Col span={24} xl={12}>
            <Space direction="horizontal">
              <Link
                to={{
                  pathname: `/investments/${entityType}/${legalEntityId}/${appApi.state.selectedProfileIds?.[0]}/overview`,
                  state: { from: "dashboard" },
                }}
              >
                <Button type="primary">
                  {t("general_view")}{" "}
                  {`${capitalizeFirstLetter(
                    entityType == "project"
                      ? isHebrew ? t("general_on_project") : t("general_project")
                      : isHebrew ? t("general_on_fund") : t("general_fund")
                  )}`}
                </Button>
              </Link>
              <Link
                to={{
                  pathname: `/investments/${entityType}/${legalEntityId}/${appApi.state.selectedProfileIds?.[0]}/documents`,
                  state: { from: "dashboard" },
                }}
              >
                <Button type="text" className="color-primary">
                  {t("dashboard_investments_documents")}
                </Button>
              </Link>
            </Space>
          </Col>
          <Col
            span={24}
            xl={12}
            className="dashboard-investments-panel-actions-navigation"
          >
            <Button
              type="text"
              size="small"
              className="font-size-sm"
              onClick={handlePreviousClick}
              disabled={index === 0}
            >
              <LeftOutlined 
              rotate={isHebrew ? 180 : 0} 
              style={{ fontSize: 12 }} 
              />
              {t("osp_previous_button")}
            </Button>
            <BulletNavigation
              index={index}
              items={
                investmentList
                  ? investmentList.map(({ title }: Investment) => title)
                  : []
              }
              onChange={handleNavigationChange}
            />
            <Button
              type="text"
              size="small"
              className="font-size-sm"
              onClick={handleNextClick}
              disabled={index === investmentList?.length - 1}
            >
              {t("osp_next_button")}
              <RightOutlined 
              rotate={isHebrew ? 180 : 0} 
              style={{ fontSize: 12 }}
              />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
);

export default DashboarInvestmentsPanelActions;
