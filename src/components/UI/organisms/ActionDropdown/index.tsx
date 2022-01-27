import React, { useMemo } from "react";
import Icon from "@Components/UI/atoms/Icon";
import Typography from "@Components/UI/atoms/Typography";
import Button from "@Components/UI/atoms/Button";
import Dropdown from "@Components/UI/molecules/Dropdown";
import Menu from "@Components/UI/molecules/Menu";
import "./index.less";
import { ReactNode } from "react";
import { TextTypeProps } from "@Types/shared-types";
import { DropDownProps } from "antd/lib/dropdown";
import { ImageElement } from "@Types/react-html-elements";
import { DownOutlined } from "@ant-design/icons";

interface Props extends Omit<DropDownProps, "overlay"> {
  show?: boolean;
  title: string;
  children?: ReactNode;
  options: Array<Option>;
  metadata?: Object;
  icon?: string;
  onSelect: (action: string) => void;
  numberSelected?: number;
}
interface Option {
  name: string;
  icon: ImageElement | SVGElement;
  size: string;
  type?: TextTypeProps;
  disabled: boolean;
}

const { Text } = Typography;

const ActionDropdown = ({
  show = true,
  title,
  children,
  options,
  metadata,
  onSelect,
  icon = "menu-dropdown-icon",
  numberSelected,
  ...rest
}: Props) => {
  const actionsMenu = useMemo(
    () => (
      <Menu className="action-inline-menu">
        {options &&
          options.map(({ name, icon, type, disabled = false }, index) => (
            <Menu.Item
              key={name}
              className="action-inline-menu-item"
              disabled={disabled}
              icon={
                React.isValidElement(icon) ? (
                  <span className="mr-sm">{icon}</span>
                ) : (
                  <Icon
                    size={"15"}
                    name={icon}
                    className="action-inline-menu-item-icon-image"
                  />
                )
              }
              onClick={(e) => {
                e?.domEvent?.stopPropagation();
                onSelect(e.key);
              }}
            >
              <Text type={type ? type : null} className="ml-md">
                {name}
              </Text>
            </Menu.Item>
          ))}
      </Menu>
    ),
    [options, metadata]
  );

  return (
    <Dropdown trigger={["click"]} overlay={actionsMenu} arrow {...rest}>
      <Button
        className="bulk-actions-button flex align-items-center"
        type="primary"
      >
        <span className="bulk-actions-button-text">
          {title} {numberSelected ? `(${numberSelected})` : ""}
        </span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ActionDropdown;
