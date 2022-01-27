import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EnvironmentOutlined } from "@ant-design/icons";
import {
  dateFormatterFromString,
  formatAddress,
  formatCurrency,
} from "@Utils/formatters";
import { Investment } from "@Types/investment";
import { Row, Col } from "@Components/containers/shared/Grid";
import Typography from "@Components/UI/atoms/Typography";
import BackgroundImage from "@Components/UI/molecules/BackgroundImage";
import Divider from "@Components/UI/atoms/Divider";
import Box from "@Components/UI/organisms/Box";
import DashboarInvestmentsPanelActions from "./actions";
import "./index.less";

const { Title, Text } = Typography;

export interface DashboardInvestmentsPanelContentProps {
  investmentList: Investment[];
  index: number;
  loading: boolean;
  onChangeItem: (index: number) => void;
}

export const DashboardInvestmentsPanelContent = memo(
  ({
    investmentList,
    index,
    loading,
    onChangeItem,
  }: DashboardInvestmentsPanelContentProps) => {
    const { t } = useTranslation();
    const investment: Investment =
      investmentList && investmentList.length > 0
        ? investmentList[index]
        : null;
        
    if (!investment) return null;

    const image = useMemo(() => {
      const orderArray =
        investment?.images?.map((img) => img?.metaData?.order) || [];
      const firstInOrder = Math.min(...orderArray);
      return investment && investment?.images && investment.images.length > 0
        ? investment.images.find(
            (img) => img?.metaData?.order === firstInOrder
          ) ||
            investment.images.find(
              (img) => img?.metaData?.order === firstInOrder
            ) ||
            investment.images[0]
        : null;
    }, [investment]);

    const {
      investedBy,
      legalEntityId,
      entityType,
      entityOwnership,
      legalEntity,
      amountInvested,
      commitmentDate,
      amountContributed,
      distributionToDate,
      lastRelevancyDate,
      title,
      legalEntityCurrency,
    } = investment || {};

    const investmentAddress = useMemo(
      () => formatAddress(legalEntity?.mailAddress),
      [legalEntity?.mailAddress]
    );

    const isFund = entityType === "fund";

    return (
      <div className="dashboard-investments-panel-content">
        <Row gutter={[24, 16]}>
          <Col
            xs={24}
            lg={12}
            xl={8}
            xxl={7}
            className="dashboard-investments-panel-content-image"
          >
            <BackgroundImage
              src={image?.url}
              size={image?.metaData?.fitBracketSize ? "contain" : "cover"}
              className="rounded-md"
              style={{
                height: "100%",
                width: "100%",
                minHeight: 230,
              }}
            />
          </Col>
          <Col
            xs={24}
            lg={12}
            xl={16}
            xxl={17}
            className="dashboard-investments-panel-content-data"
          >
            <Title
              ellipsis={{ tooltip: title }}
              level={3}
              className="dashboard-investments-panel-content-data-title"
            >
              {title}
            </Title>
            <Row
              justify="space-between"
              align="middle"
              className="dashboard-investments-panel-content-data-row"
            >
              <Text
                ellipsis={{ tooltip: investmentAddress }}
                className="font-size-sm"
              >
                <EnvironmentOutlined /> {investmentAddress || "-"}
              </Text>
              <Text className="font-size-sm">
                {t("dashboard_investments_invested_by")}{" "}
                <b className="font-weight-extra-bold">{investedBy}</b>
              </Text>
            </Row>
            <Divider className="dashboard-investments-panel-content-divider" />
            <Row align="top" gutter={[48, 16]} className="content-data">
              <Col xs={24} md={12} className="content-data-section">
                <Box
                  className="flex align-items-center justify-content-between content-data-item"
                  mb="sm"
                >
                  <Text>{t("entity_is_item_amount_invested")}</Text>
                  <Text className="content-data-item-value">
                    {formatCurrency(amountInvested, legalEntityCurrency)}
                  </Text>
                </Box>
                <Box
                  className="flex align-items-center justify-content-between content-data-item"
                  mb="sm"
                >
                  <Text>{t("dashboard_investments_entity_ownership")}</Text>
                  <Text className="content-data-item-value">
                    {entityOwnership}
                  </Text>
                </Box>
                <Box
                  className="flex align-items-center justify-content-between content-data-item"
                  mb="sm"
                >
                  <Text>{t("dashboard_investments_distribution_to_date")}</Text>
                  <Text className="content-data-item-value">
                    {formatCurrency(distributionToDate, legalEntityCurrency)}
                  </Text>
                </Box>
              </Col>
              <Col xs={24} md={12}>
                <Box
                  className="flex align-items-center justify-content-between content-data-item"
                  mb="sm"
                >
                  <Text>
                    {isFund
                      ? t("dashboard_investments_commitment_date")
                      : t("dashboard_investments_investment_date")}
                  </Text>
                  <Text className="content-data-item-value">
                    {dateFormatterFromString(commitmentDate)}
                  </Text>
                </Box>
                {isFund && (
                  <Box
                    className="flex align-items-center justify-content-between content-data-item"
                    mb="sm"
                  >
                    <Text>
                      {t("dashboard_investments_amount_contribution")}
                    </Text>
                    <Text className="content-data-item-value">
                      {formatCurrency(amountContributed, legalEntityCurrency)}
                    </Text>
                  </Box>
                )}
                <Box
                  className="flex align-items-center justify-content-between content-data-item"
                  mb="sm"
                >
                  <Text>{t("dashboard_investments_last_distribution")}</Text>
                  <Text className="content-data-item-value">
                    {dateFormatterFromString(lastRelevancyDate)}
                  </Text>
                </Box>
              </Col>
            </Row>
            <DashboarInvestmentsPanelActions
              onChangeItem={onChangeItem}
              index={index}
              investmentList={investmentList}
              legalEntityId={legalEntityId}
              entityType={entityType}
            />
          </Col>
        </Row>
      </div>
    );
  }
);

export default DashboardInvestmentsPanelContent;
