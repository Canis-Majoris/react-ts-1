import themes from '@Constants/values/themes';
import { useUI } from '@Providers/UIProvider';
import Link from '@Components/UI/atoms/Link';
import Space from '@Components/UI/atoms/Space';
import Dropdown from '@Components/UI/molecules/Dropdown';
import Menu from '@Components/UI/molecules/Menu';
import { Row, Col } from '@Components/containers/shared/Grid';
import './index.less';

interface OverlayProps {
  onMenuClick: (arg: {key: boolean | string}) => void;
}

const Overlay = ({ onMenuClick }: OverlayProps) => (
  <Menu onClick={onMenuClick}>
    {themes.map((theme) => (
      <Menu.Item key={theme}>{theme}</Menu.Item>
    ))}
  </Menu>
);

const ThemeSwitcher = () => {

  const { setTheme } = useUI();

  const handleMenuClick = ({ key }) => {
    setTheme(key);
  };

  return (
    <Row>
      <Col span={24}>
        <div className='theme-dropdown-wrapper'>
          <Space size='large'>
            <Dropdown overlay={<Overlay onMenuClick={handleMenuClick} />}>
              <Link
                className='ant-dropdown-link'
                onClick={(e) => e.preventDefault()}
              >
                Select theme
              </Link>
            </Dropdown>
          </Space>
        </div>
      </Col>
    </Row>
  );
};

export default ThemeSwitcher;
