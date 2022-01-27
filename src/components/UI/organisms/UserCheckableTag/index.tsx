import { memo } from 'react';
import { Col, Row } from '@Components/containers/shared/Grid';
import Box, { BoxProps } from '@Components/UI/organisms/Box';
import Icon from '@Components/UI/atoms/Icon';
import Tag from '@Components/UI/atoms/Tag';
import Avatar from '@Components/UI/atoms/Avatar';
import Typography from '@Components/UI/atoms/Typography';
import './index.less';

const { Text } = Typography;
const { CheckableTag } = Tag;

interface Item {
  id: string | number;
  email?: string;
  legalName?: string;
  urlPhoto?: string | undefined | null;
}

interface UserCheckableTagProps extends BoxProps {
  item: Item;
  checked: boolean;
  onClick: (item: Item) => void;
  generateName: (item: Item) => string | JSX.Element;
}

const UserCheckableTag = ({
  item,
  checked,
  onClick,
  generateName,
  ...rest
}: UserCheckableTagProps) => {
  return (
    <Box {...rest}>
      <CheckableTag
        key={item.id}
        checked={checked}
        onChange={() => onClick(item)}
        className='user-checkable-tag'
      >
        <Row gutter={[16, 16]} justify='space-between' align='middle'>
          {item?.urlPhoto && (
            <Col>
              <Avatar
                src={item?.urlPhoto}
                icon={<Icon name='default-avatar-1' width={17} height={23} />}
              />
            </Col>
          )}
          <Col className='flex flex-column'>
            <Text className={checked ? 'color-bright' : ''} strong>
              {generateName(item)}
            </Text>
            {item?.email && (
              <Text className={checked ? 'color-bright' : ''}>
                {item.email}
              </Text>
            )}
          </Col>
          {checked && (
            <Col className='ml-auto flex align-items-start'>
              <div className='assigned-filter-list-item-checked'>
                <Icon name='check-1-white' size={12} />
              </div>
            </Col>
          )}
        </Row>
      </CheckableTag>
    </Box>
  );
};

export default memo(UserCheckableTag);
