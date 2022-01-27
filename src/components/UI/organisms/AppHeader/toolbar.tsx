import { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SendOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '@Providers/AuthProvider';
import Button from '@Components/UI/atoms/Button';
import Space from '@Components/UI/atoms/Space';
import Avatar from '@Components/UI/atoms/Avatar';
import Menu from '@Components/UI/molecules/Menu';
import Box, { BoxProps } from '@Components/UI/organisms/Box';
import Dropdown from '@Components/UI/molecules/Dropdown';
import { useState } from 'react';
import SendRequestDrawer from '@Features/sendRequest/SendRequestDrawer';
import LanguageSwitcher from '@Components/UI/organisms/LanguageSwitcher';
import { useUI } from '@Providers/UIProvider';
import BurgerMenu from '../BurgerMenu';
import { menuItems } from './consts';
import { AppHeaderMenuItem } from '@Types/app-header-menu';
import './index.less';
import BurgerIcon from '../BurgerIcon';
import { ContactRelatedAccount } from '@Types/account';
import { useApp } from '@Providers/AppProvider';

interface AppHeaderToolbarProps extends BoxProps {
  onLogoutClick: () => void;
  contactRelatedAccounts: ContactRelatedAccount[];
  handleSelectAccount: (account: ContactRelatedAccount) => void;
}

export const AppHeaderToolbar = ({
  onLogoutClick,
  contactRelatedAccounts,
  handleSelectAccount,
  ...rest
}: AppHeaderToolbarProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n?.language;
  const { width } = useUI();
  const { isPortalPreview } = useApp();
  const [showSendRequest, setShowSendRequest] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const toolbarUserMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item key='profile'>
          <Link to='/settings'>{t('toolbar_settings')}</Link>
        </Menu.Item>
        {contactRelatedAccounts.length > 1 && (
          <Menu.Item
            key='select-account'
            onClick={() => handleSelectAccount(null)}
          >
            <Link
              to={{ pathname: '/select-account', state: { firstVisit: false } }}
            >
              {'Investor Selection'}
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key='log-out' onClick={onLogoutClick}>
          {t('toolbar_logout')}
        </Menu.Item>
      </Menu>
    ),
    [onLogoutClick, language]
  );

  const toggleSendRequestDrawer = () => {
    setShowSendRequest(!showSendRequest);
  };

  const toggleBurgerMenuDrawer = () => {
    setShowBurgerMenu(!showBurgerMenu);
  };

  return (
    <Box
      className='app-header-toolbar flex justify-space-between h-100'
      {...rest}
    >
      {width > 915 ? (
        <Space size='large' align='center' direction='horizontal'>
          <Button
            type='primary'
            icon={<SendOutlined />}
            disabled={isPortalPreview}
            onClick={toggleSendRequestDrawer}
          >
            {t('toolbar_send_request')}
          </Button>
          <LanguageSwitcher />
          <Dropdown
            overlay={toolbarUserMenu}
            placement='bottomLeft'
            mouseLeaveDelay={0.5}
          >
            <Button
              className='p-none'
              type='text'
              shape='circle'
              icon={
                <Avatar
                  className='app-header-toolbar-dropdown-avatar'
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              }
            />
          </Dropdown>
        </Space>
      ) : (
        <div
          className={`burger-icon-box ${language}`}
          onClick={toggleBurgerMenuDrawer}
        >
          <BurgerIcon />
        </div>
      )}
      <SendRequestDrawer
        visible={showSendRequest}
        onClose={toggleSendRequestDrawer}
      />
      <BurgerMenu
        visible={showBurgerMenu}
        onClose={toggleBurgerMenuDrawer}
        toggleSendRequestDrawer={toggleSendRequestDrawer}
        onLogoutClick={onLogoutClick}
        contactRelatedAccounts={contactRelatedAccounts}
        handleSelectAccount={handleSelectAccount}
      />
    </Box>
  );
};

export default (props) => {
  const api = useAuth();

  if (!api) {
    throw new Error('No Provider detected');
  }

  return (
    <AppHeaderToolbar
      onLogoutClick={api.handleLogout}
      contactRelatedAccounts={api.state.contactRelatedAccounts}
      handleSelectAccount={api.handleSelectAccount}
      {...props}
    />
  );
};
