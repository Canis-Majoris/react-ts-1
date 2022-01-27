import { Row } from "@Components/containers/shared/Grid";
import Alert from "@Components/UI/atoms/Alert";
import Typography from "@Components/UI/atoms/Typography";
import Skeleton from "@Components/UI/molecules/Skeleton";
import { useUI } from "@Providers/UIProvider";
import useInvestorInfoState from "@State/useInvestorInfoState";
import { Investor } from "@Types/investor";
import "./index.less";

export interface PreviewBannerPanelProps {
  loading: boolean;
  error: any;
  investor: Investor;
}

const { Text } = Typography;

export const PreviewBannerPanel = ({
  loading,
  error,
  investor,
}: PreviewBannerPanelProps) => {
  const { colors } = useUI();

  return (
    <Row
      justify="center"
      align="middle"
      className="preview-banner w-100"
      style={{ backgroundColor: colors?.primaryColor }}
    >
      {loading ? (
        <Skeleton.Input active />
      ) : (
        !error && (
          <Text className="preview-banner-text">{`You are viewing the portal as: ${
            investor?.username || ""
          }`}</Text>
        )
      )}
      {error && (
        <Alert
          type="error"
          showIcon
          message={error?.message}
          className="w-100"
        />
      )}
    </Row>
  );
};

export default () => {
  const {
    isLoading: isInvestorInfoLoading,
    error: investorInfoError,
    data: investorInfoData,
  } = useInvestorInfoState();

  return (
    <PreviewBannerPanel
      loading={isInvestorInfoLoading}
      error={investorInfoError}
      investor={investorInfoData?.data}
    />
  );
};
