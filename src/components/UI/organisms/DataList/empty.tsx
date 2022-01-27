import Icon from "@Components/UI/atoms/Icon";
import Space from "@Components/UI/atoms/Space";
import Typography from "@Components/UI/atoms/Typography";
import Empty from "@Components/UI/molecules/Empty";
import "./index.less";
import { EmptyProps } from 'antd/lib/empty'
import { ReactNode } from "react";

interface ListEmptyProps extends EmptyProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

const { Title, Text } = Typography;

const ListEmpty = ({ icon, title, subtitle, actions, ...rest }: ListEmptyProps) => {
  return (
    <Empty
      imageStyle={
        icon ? { height: 100, marginBottom: 8 } : { height: 0, margin: 0 }
      }
      image={icon ? <Icon name={icon} width={200} height='auto' /> : false}
      description={
        <div className='p-md'>
          <div>
            {title && <Title level={3}>{title}</Title>}
            {subtitle && <Text>{subtitle}</Text>}
          </div>
          {actions && <Space size='middle' className="m-t-md">{actions}</Space>}
        </div>
      }
      {...rest}
    />
  );
};

export default ListEmpty;
