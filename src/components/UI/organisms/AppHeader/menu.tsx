import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppHeaderMenuItem } from "@Types/app-header-menu";
import Menu from "@Components/UI/molecules/Menu";
import Box, { BoxProps } from "@Components/UI/organisms/Box";
import { menuItems } from "./consts";
import "./index.less";

interface AppHeaderMenuProps extends BoxProps {}

const AppHeaderMenu = (props: AppHeaderMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const selected =
    menuItems.find(({ key }) => location.pathname.slice(1).includes(key))
      ?.route || location.pathname;

  return (
    <Box className="app-header-menu-wrapper" {...props}>
      <Menu
        mode="horizontal"
        className="app-header-menu"
        selectedKeys={[selected]}
      >
        {menuItems.map(({ key, route }: AppHeaderMenuItem) => (
          <Menu.Item
            key={route}
            className="app-header-menu-item"
          >
            <Link to={route}>
              <span className="app-header-menu-item-active-state">
                {t(`app.header.menu.${key}`)}
              </span>
              <span className="app-header-menu-item-passive-state">
                {t(`app.header.menu.${key}`)}
              </span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Box>
  );
};

export default AppHeaderMenu;
