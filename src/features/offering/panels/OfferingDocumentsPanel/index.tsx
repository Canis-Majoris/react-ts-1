import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useOffering } from "@Providers/OfferingProvider";
import { File } from "@Types/file";
import useOfferingDocumentsState from "@State/useOfferingDocumentsState";
import { Row, Col } from "@Components/containers/shared/Grid";
import Space from "@Components/UI/atoms/Space";
import Typography from "@Components/UI/atoms/Typography";
import DocumentsList from "@Components/UI/organisms/DocumentsList";
import "./index.less";
import Divider from "@Components/UI/atoms/Divider";

const { Title, Text } = Typography;

export interface OfferingDocumentsPanelProps {
  loading: boolean;
  error: any;
  documents: File[];
}

export const OfferingDocumentsPanel = memo(
  ({ loading, error, documents }: OfferingDocumentsPanelProps) => {
    if (!loading && (!documents || documents?.length === 0)) {
      return null;
    }
    
    const { t } = useTranslation();

    return (
      <div className="offering-documents-panel">
        <Row gutter={[16, 16]} className="mb-md">
          <Col span={24}>
            <Space direction="horizontal" align="center">
              <Title level={3} className="offering-documents-panel-title">
                {t("offering_page_documents")}
              </Title>
            </Space>
          </Col>
        </Row>
        <DocumentsList loading={loading} items={documents} />
        <Divider className="divider-dark" />
      </div>
    );
  }
);

export default (props) => {
  const { id } = useOffering();
  const { data, isLoading, error } = useOfferingDocumentsState(id);
  const { files } = data?.data || {};

  return (
    <OfferingDocumentsPanel
      loading={isLoading}
      error={error}
      documents={files}
      {...props}
    />
  );
};
