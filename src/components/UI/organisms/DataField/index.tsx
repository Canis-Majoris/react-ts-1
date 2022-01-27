import Space from "@Components/UI/atoms/Space";
import Typography from "@Components/UI/atoms/Typography";
import "./index.less";

const { Text } = Typography;

const DataField = ({ title, value }) => {
  return (
    <div className="detail-field">
      <Space direction="horizontal" size="middle">
        <Text className="detail-field-title" ellipsis={{tooltip: title}}>{title}</Text>
        <Text className="detail-field-value" ellipsis={{tooltip: value}}>{value || "-"}</Text>
      </Space>
    </div>
  );
};

export default DataField;
