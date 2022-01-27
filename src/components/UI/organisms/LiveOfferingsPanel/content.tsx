import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EnvironmentOutlined } from "@ant-design/icons";
import {
  dateFormatterFromString,
  formatAddress,
  formatCurrency,
} from "@Utils/formatters";
import { Offering, OfferingRestrictionList } from "@Types/offering";
import { Row, Col } from "@Components/containers/shared/Grid";
import Typography from "@Components/UI/atoms/Typography";
import Space from "@Components/UI/atoms/Space";
import Button from "@Components/UI/atoms/Button";
import BackgroundImage from "@Components/UI/molecules/BackgroundImage";
import Box from "@Components/UI/organisms/Box";
import ExistingSubscriptionModal from "../ExistingSubscriptionModal";
import useOfferingSubscriptionsState from "@State/useOfferingSubscriptionsState";
import { useCreateSubscription } from "mutations/subscription";
import CardBackgroundOverlay from "../CardBackgroundOverlay";
import Tag from "@Components/UI/atoms/Tag";
import InfoList from "../InfoList";
import "./index.less";
import { loadFromLocalStorage } from "@Utils/local-storage";
import { useApp } from "@Providers/AppProvider";

const { Title, Text } = Typography;

export interface LiveOfferingsPanelContentProps {
  loading?: boolean;
  offeringsList: Offering[];
  index: number;
  onLearnMoreClick: () => void;
}

export const LiveOfferingsPanelContent = memo(
  ({
    offeringsList,
    index,
    onLearnMoreClick,
  }: LiveOfferingsPanelContentProps) => {
    const { t } = useTranslation();
    const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);
    const { isPortalPreview } = useApp();

    const offering: Offering =
      offeringsList && offeringsList.length > 0 ? offeringsList[index] : null;

    const image = useMemo(
      () =>
        offering && offering?.images && offering.images.length > 0
          ? offering.images.find(({ metaData }) => metaData?.order === 0) || offering.images[0]
          : null,
      [offering]
    );

    if (!offering) return null;

    const offeringAddress = useMemo(
      () => formatAddress(offering?.legalEntity?.mailAddress),
      [offering?.legalEntity?.mailAddress]
    );

    const {
      id,
      legalEntity,
      capitalRaisingTarget,
      minAmountOfInvestment,
      maxAmountOfInvestment,
      offeringName,
      offeringRestriction,
      prospects,
      closingDate,
    } = offering || {};

    const {
      isLoading: isOfferingsSubscriptionsLoading,
      data: offeringsSubscriptionsData,
    } = useOfferingSubscriptionsState({
      offeringId: id,
    });

    const subscritptions =
      offeringsSubscriptionsData?.data?.subscriptions || [];

    const { mutate: mutateCreateSubscription } = useCreateSubscription({
      offeringId: id,
    });

    const toggleSubscriptionsModal = () => {
      setShowSubscriptionsModal(!showSubscriptionsModal);
    };

    const handleActionButtonClick = (e) => {
      e.stopPropagation();
      const numberOfSubscriptions = subscritptions?.length;
      if (numberOfSubscriptions > 0) {
        toggleSubscriptionsModal();
      } else {
        mutateCreateSubscription();
      }
    };

    const isSubscriptionInProgress = useMemo(
      () =>
        Boolean(
          subscritptions?.find(
            (subsc) => Boolean(subsc?.stage) && subsc?.stage < 4
          )
        ),
      [subscritptions]
    );

    return (
      <div className="live-offerings-panel-content">
        <Row gutter={[24, 16]}>
          <Col span={24} className="live-offerings-panel-content-image">
            <BackgroundImage
              src={image?.url}
              size={image?.metaData?.fitBracketSize ? "contain" : "cover"}
              onClick={onLearnMoreClick}
              className="rounded-md mb-sm"
              style={{
                width: "100%",
                height: 190,
              }}
              overlay={
                <CardBackgroundOverlay
                  title={offeringName}
                  subtitle={offeringAddress || "-"}
                  subtitleIcon={
                    <EnvironmentOutlined style={{ color: "white" }} />
                  }
                  tag={
                    isSubscriptionInProgress && (
                      <Tag color="blue" className="m-none rounded-lg">
                        {t("offering_subscription_inprogress")}
                      </Tag>
                    )
                  }
                />
              }
            />
            <InfoList
              info={[
                {
                  title: t("offering_page_currency"),
                  value: legalEntity?.currency,
                },
                {
                  title: t("offering_page_min_amount"),
                  value: formatCurrency(
                    minAmountOfInvestment,
                    legalEntity.currency
                  ),
                  optional: true,
                },
                {
                  title: t("offering_page_max_amount"),
                  value: formatCurrency(
                    maxAmountOfInvestment,
                    legalEntity.currency
                  ),
                  optional: true,
                },
                {
                  title: t("offering_page_raising"),
                  value: formatCurrency(
                    capitalRaisingTarget,
                    legalEntity.currency
                  ),
                },
                {
                  title: t("offering_page_closing_date"),
                  value: dateFormatterFromString(closingDate),
                  optional: true,
                },
              ]}
            />
            <Box className="live-offerings-panel-content-footer">
              <Space direction="horizontal">
                {(prospects ||
                  offeringRestriction?.id ===
                    OfferingRestrictionList.publicOpenToInvest) && (
                  <Button
                    type="primary"
                    loading={isOfferingsSubscriptionsLoading}
                    disabled={isPortalPreview}
                    onClick={handleActionButtonClick}
                  >
                    {t("offering_page_view_subscription_package")}
                  </Button>
                )}
                <Button type="text" onClick={onLearnMoreClick}>
                  {t("dashboard_offerings_learn_more")}
                </Button>
              </Space>
            </Box>
          </Col>
        </Row>
        <ExistingSubscriptionModal
          visible={showSubscriptionsModal}
          onCancel={toggleSubscriptionsModal}
          offeringId={id}
          currency={legalEntity?.currency}
          subscriptions={offeringsSubscriptionsData?.data?.subscriptions}
        />
      </div>
    );
  }
);

export default LiveOfferingsPanelContent;
