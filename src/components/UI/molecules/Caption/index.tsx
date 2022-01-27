import React from 'react';
import Typography from '@Components/UI/atoms/Typography';
import Space, { SpaceProps } from '@Components/UI/atoms/Space';
import Skeleton from '@Components/UI/molecules/Skeleton';
import './index.less';

interface CaptionProps extends Omit<SpaceProps, 'title'> {
  icon?: any;
  title?: string | React.ReactNode;
  subtitle?: string;
  loading?: boolean;
}

const { Text } = Typography;

const Caption = ({ icon, title, subtitle, loading, ...rest }: CaptionProps) => {
  return loading ? (
    <Skeleton.Input style={{ width: 100, height: 16 }} active />
  ) : (
    <Space className='caption' direction='horizontal' {...rest}>
      {icon}
      {title && <Text className='caption-title'>{title}</Text>}
      {subtitle && <Text className='caption-title'>{subtitle}</Text>}
    </Space>
  );
};

export default Caption;
