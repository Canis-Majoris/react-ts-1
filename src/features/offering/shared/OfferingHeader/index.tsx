import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useOffering } from "@Providers/OfferingProvider";
import { Offering } from "@Types/offering";
import { Investor } from "@Types/investor";
import useInvestorInfoState from "@State/useInvestorInfoState";
import useOfferingState from "@State/useOfferingState";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import CarryOutOutlined from "@ant-design/icons/CarryOutOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { dateFormatterFromString, formatAddress } from "@Utils/formatters";
import { Row } from "@Components/containers/shared/Grid";
import ArrowLeftOutlined from "@ant-design/icons/ArrowLeftOutlined";
import Typography from "@Components/UI/atoms/Typography";
import Skeleton from "@Components/UI/molecules/Skeleton";
import Space from "@Components/UI/atoms/Space";
import Button from "@Components/UI/atoms/Button";
import Tag from "@Components/UI/atoms/Tag";
import Caption from "@Components/UI/molecules/Caption";
import useOfferingSubscriptionsState from "@State/useOfferingSubscriptionsState";
import { Subscription } from "@Types/subscription";
import "./index.less";

const { Text, Title } = Typography;

export interface OfferingHeaderProps {
  loading: boolean;
  error: Error;
  offering: Offering;
  investor: Investor;
  subscriptions: Subscription[];
}

export const OfferingHeader = memo(
  ({ loading, offering, investor, subscriptions }: OfferingHeaderProps) => {
    const { t, i18n } = useTranslation();
    const history = useHistory();

    const { offeringName, legalEntity, closingDate } = offering || {};
    const { firstName, lastName } = investor || {};

    const address = useMemo(() => formatAddress(legalEntity?.mailAddress), [
      legalEntity?.mailAddress,
    ]);

    const investorName =
      firstName && lastName ? `${firstName} ${lastName}` : null;

    const closingDateValue = closingDate
      ? dateFormatterFromString(closingDate)
      : null;

    const handleBackClick = () => {
      history.goBack();
    };

    const isSubscriptionInProgress = useMemo(
      () =>
        Boolean(
          subscriptions?.find(
            (subsc) => Boolean(subsc?.stage) && subsc?.stage < 4
          )
        ),
      [subscriptions]
    );

    return (
      <div className="offering-header">
        <Row className="mb-md">
          <Space direction="horizontal" size="middle" align="center">
            <Button
              type="text"
              size="large"
              shape="circle"
              className="color-primary"
              icon={
                <ArrowLeftOutlined
                  rotate={i18n.language == "he" ? 180 : 0}
                  style={{ fontSize: 22 }}
                />
              }
              onClick={handleBackClick}
            />
            <Title
              level={2}
              className="offering-header-title ellipsis"
            >
              {loading ? (
                <Skeleton.Input style={{ width: 200, height: 40 }} active />
              ) : (
                offeringName
              )}
            </Title>
            {isSubscriptionInProgress && (
              <Tag color="blue" className="rounded-lg ml-sm mr-none">
                {t("offering_subscription_inprogress")}
              </Tag>
            )}
          </Space>
        </Row>
        <Row style={{ marginTop: "14px" }}>
          <Space
            direction="horizontal"
            size="large"
            align="center"
            className="offering-header-space-captions"
            wrap
          >
            <Caption
              icon={<EnvironmentOutlined />}
              title={address}
              loading={loading}
            />
            <Caption
              icon={<UserOutlined />}
              title={
                <Text>
                  {t("general_prepared_for")} <b>{investorName}</b>
                </Text>
              }
              loading={loading}
            />
            {closingDateValue && (
              <Caption
                icon={<CarryOutOutlined />}
                title={
                  <Text>
                    {t("entity_is_item_closing_date")} <b>{closingDateValue}</b>
                  </Text>
                }
                loading={loading}
              />
            )}
          </Space>
        </Row>
      </div>
    );
  }
);

export default (props) => {
  const { id } = useOffering();
  const { data, isLoading, error } = useOfferingState(id);
  const {
    data: investorInfoData,
    isLoading: isUserInfoLoading,
  } = useInvestorInfoState();

  const {
    isLoading: isOfferingsSubscriptionsLoading,
    error: isOfferingsSubscriptionsError,
    data: offeringsSubscriptionsData,
  } = useOfferingSubscriptionsState({
    offeringId: id,
  });

  return (
    <OfferingHeader
      loading={
        isLoading || isUserInfoLoading || isOfferingsSubscriptionsLoading
      }
      error={error || isOfferingsSubscriptionsError}
      offering={data?.data?.offering}
      investor={investorInfoData?.data}
      subscriptions={offeringsSubscriptionsData?.data?.subscriptions}
      {...props}
    />
  );
};
