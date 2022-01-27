import Space from "@Components/UI/atoms/Space";
import OfferingDescriptionPanel from "@Features/offering/panels/OfferingDescriptionPanel";
import OfferingDocumentsPanel from "@Features/offering/panels/OfferingDocumentsPanel";
import OfferingGalleryPanel from "@Features/offering/panels/OfferingGalleryPanel";
import OfferingLocationPanel from "@Features/offering/panels/OfferingLocationPanel";
import OfferingStatisticsPanel from "@Features/offering/panels/OfferingStatisticsPanel";
import OfferingActionButton from "@Features/offering/shared/OfferingActionButton";
import OfferingHeader from "@Features/offering/shared/OfferingHeader";
import "./index.less";

const OfferingPageTemplate = () => {
  return (
    <div className="offering-page-template">
      <Space direction="vertical" size="large" className="w-100">
        <OfferingHeader />
        <OfferingGalleryPanel />
        <OfferingStatisticsPanel />
        <OfferingDescriptionPanel />
        <OfferingDocumentsPanel />
        <OfferingLocationPanel />
      </Space>
      <OfferingActionButton />
    </div>
  );
};

export default OfferingPageTemplate;
