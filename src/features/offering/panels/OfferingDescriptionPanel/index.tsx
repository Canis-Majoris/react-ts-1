import { useState, useEffect, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { useOffering } from "@Providers/OfferingProvider";
import useOfferingState from "@State/useOfferingState";
import { Row, Col } from "@Components/containers/shared/Grid";
import Typography from "@Components/UI/atoms/Typography";
import Space from "@Components/UI/atoms/Space";
import Tag from "@Components/UI/atoms/Tag";
import Loading from "@Components/UI/molecules/Loading";
import Button from "@Components/UI/atoms/Button";
import Empty from "@Components/UI/molecules/Empty";
import ReadMoreModal from "@Components/UI/organisms/ReadMoreModal";
import Divider from "@Components/UI/atoms/Divider";
import { HTMLCharacterCount, isElementOverflowing } from "@Tools/utils";
import "./index.less";

const { Title } = Typography;
export interface OfferingDescriptionPanelProps {
  loading: boolean;
  description: string;
  error: Error;
  tags: string;
}

export const OfferingDescriptionPanel = ({
  loading,
  error,
  description,
  tags,
}: OfferingDescriptionPanelProps) => {
  if (!loading && !Boolean(HTMLCharacterCount(description))) {
    return null;
  }

  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const [readMoreModalVisible, setReadMoreModalVisible] = useState(false);
  const descriptionRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (descriptionRef.current) {
      const div = descriptionRef.current;
      const isOverflowing = isElementOverflowing(div);
      setShowReadMoreButton(isOverflowing);
    }
  }, [descriptionRef, description]);

  const tagList = tags ? tags.split(";") : [];

  return (
    <div className="offering-description-panel">
      <Row gutter={[16, 16]} className="mb-md">
        <Col span={24}>
          <Space direction="horizontal" align="center">
            <Title level={3} className="offering-description-panel-title">
              {t("entity_overview_about")}
            </Title>
            {tagList.map((tag: string, index: number) => (
              <Tag key={index} className="offering-description-panel-tag">
                {tag}
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>
      {loading ? (
        <Loading size={32} className="w-100" />
      ) : description ? (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div
              ref={descriptionRef}
              className="offering-description-panel-description pt-lg ellipsis"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {showReadMoreButton && (
              <Button
                type="text"
                className="color-primary font-size-sm offering-description-panel-more-button"
                onClick={() => setReadMoreModalVisible(p => !p)}
              >
                {t("entity_recent_development_read_more")}{" "}
                <ArrowRightOutlined
                  rotate={i18n.language == "he" ? 180 : 0}
                  style={{ fontSize: 12 }}
                />
              </Button>
            )}
          </Col>
        </Row>
      ) : (
        <Empty description={t("general_no_description")} />
      )}
      <Divider className="divider-dark" />
      <ReadMoreModal
        title="About This Offering"
        description={description}
        visible={readMoreModalVisible}
        onCancel={() => setReadMoreModalVisible(p => !p)}
      />
    </div>
  );
};

export default (props) => {
  const { id } = useOffering();
  const { data, isLoading, error } = useOfferingState(id);
  const { descriptions, tags } = data?.data?.offering || {};

  return (
    <OfferingDescriptionPanel
      loading={isLoading}
      error={error}
      description={descriptions}
      tags={tags}
      {...props}
    />
  );
};
