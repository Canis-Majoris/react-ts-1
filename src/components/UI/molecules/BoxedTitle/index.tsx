import { Row } from "@Components/containers/shared/Grid";
import Typography from "@Components/UI/atoms/Typography";
import "./index.less";

interface Props {
  title: string;
  level: 1 | 2 | 3 | 4 | 5;
  primary?: boolean;
  extra?: any;
}

const { Title } = Typography;

const BoxedTitle = ({ title, level, primary, extra }: Props) => {
  return (
    <Row
      justify="space-between"
      align="middle"
      className={`boxed-title-wrapper${primary ? " primary" : ""}`}
    >
      <Title level={level} className="boxed-title">
        {title}
      </Title>
      {extra && <div className="boxed-title-extra">{extra}</div>}
    </Row>
  );
};

export default BoxedTitle;
