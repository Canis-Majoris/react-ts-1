import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useOffering } from "@Providers/OfferingProvider";
import { Row, Col } from "@Components/containers/shared/Grid";
import Space from "@Components/UI/atoms/Space";
import Typography from "@Components/UI/atoms/Typography";
import useOfferingState from "@State/useOfferingState";
import Map from "@Components/UI/organisms/Map";
import "./index.less";

const { Title, Text } = Typography;

export interface OfferingLocationPanelProps {
  loading: boolean;
  error: Error;
  offeringLocations: { lat: number; lng: number }[];
}

export const OfferingLocationPanel = memo(
  ({ loading, error, offeringLocations }: OfferingLocationPanelProps) => {
    if (!loading && (!offeringLocations || offeringLocations?.length === 0)) {
      return null;
    }

    const { t } = useTranslation();

    return (
      <div className="offering-location-panel">
        <Row gutter={[16, 16]} className="mb-md">
          <Col span={24}>
            <Space direction="horizontal" align="center">
              <Title level={3} className="offering-location-panel-title">
                {t("entity_overview_location")}
              </Title>
            </Space>
          </Col>
        </Row>
        <div className="offering-location-panel-map">
          <Map loading={loading} error={error} locations={offeringLocations} />
        </div>
      </div>
    );
  }
);

export default (props) => {
  const { id } = useOffering();
  const { data, isLoading, error } = useOfferingState(id);
  const { mapDataPoints } = data?.data || {};

  const offeringLocations = mapDataPoints?.map((obj) => {
    const latitude = obj?.address?.latitude;
    const longitude = obj?.address?.longitude;
    if (latitude && longitude) {
      return {
        lat: Number(latitude),
        lng: Number(longitude),
      };
    }
  });

  return (
    <OfferingLocationPanel
      loading={isLoading}
      error={error}
      offeringLocations={offeringLocations}
      {...props}
    />
  );
};
