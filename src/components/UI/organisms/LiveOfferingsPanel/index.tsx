import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { ArrowRightOutlined, SyncOutlined } from "@ant-design/icons";
import { useLiveOfferingsWithImagesState } from "@State/useLiveOfferingsState";
import Box, { BoxProps } from "@Components/UI/organisms/Box";
import Card, { CardProps } from "@Components/UI/molecules/Card";
import Button from "@Components/UI/atoms/Button";
import Alert from "@Components/UI/atoms/Alert";
import Space from "@Components/UI/atoms/Space";
import Empty from "@Components/UI/molecules/Empty";
import LiveOfferingsPanelContent from "./content";
import LiveOfferingsPanelActions from "./actions";
import { Link } from "react-router-dom";
import Typography from "@Components/UI/atoms/Typography";
import "./index.less";

const { Text } = Typography;

export interface LiveOfferingsPanelProps
  extends CardProps,
    Omit<BoxProps, "children" | "className"> {
  data?: any;
  loading?: boolean;
  fetching?: boolean;
  fetched?: boolean;
  error?: any;
}

const LiveOfferingsPanel = memo(
  ({
    data,
    loading,
    fetching,
    fetched,
    error,
    ...rest
  }: LiveOfferingsPanelProps) => {
    if (!loading && (!data || data?.length === 0)) return null;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const { t, i18n } = useTranslation();
    const history = useHistory();

    const handleChangeItem = (newIndex: number) => {
      setSelectedIndex(newIndex);
    };

    const handleMoveToOffering = () => {
      if (data && data.length > 0)
        history.push({ pathname: `/offerings/${data[selectedIndex].id}` });
    };

    return (
      <Box
        className={`live-offerings-panel ${loading ? "data-loading" : ""}`}
        {...rest}
      >
        <Card
          loading={loading}
          bordered={false}
          title={
            <Space
              size="middle"
              align="center"
              className="live-offerings-panel-title"
            >
              <Text className="live-offerings-panel-title-text">
                {t("app.shared.live-offerings")}
              </Text>
              {fetching && !loading && (
                <SyncOutlined
                  className="live-offerings-panel-title-indicator"
                  spin
                />
              )}
            </Space>
          }
          extra={
            data?.length > 1 && (
              <Link to="/offerings">
                <Button type="text" className="color-primary font-size-sm">
                  {t("general_view_all")}
                  <ArrowRightOutlined
                    rotate={i18n.language == "he" ? 180 : 0}
                    style={{ fontSize: 12 }}
                  />
                </Button>
              </Link>
            )
          }
          actions={
            fetched &&
            data?.length > 0 && [
              <LiveOfferingsPanelActions
                index={selectedIndex}
                dataLength={data.length}
                offeringsList={data}
                onChangeItem={handleChangeItem}
              />,
            ]
          }
          {...rest}
        >
          {error && (
            <Alert
              type="error"
              showIcon
              message={error?.message}
              className="mt-md"
            />
          )}
          {!error &&
            fetched &&
            (data.length === 0 ? (
              <Empty
                description={t("empty_state_no_live_offerings")}
                className="mt-lg"
              />
            ) : (
              <LiveOfferingsPanelContent
                index={selectedIndex}
                loading={loading}
                offeringsList={data}
                onLearnMoreClick={handleMoveToOffering}
              />
            ))}
        </Card>
      </Box>
    );
  }
);

export default (props: LiveOfferingsPanelProps) => {
  const liveOfferingsState = useLiveOfferingsWithImagesState();

  return (
    <LiveOfferingsPanel
      loading={liveOfferingsState.isLoading}
      fetching={liveOfferingsState.isFetching}
      fetched={liveOfferingsState.isFetched}
      error={liveOfferingsState.error}
      data={liveOfferingsState.data}
      {...props}
    />
  );
};
