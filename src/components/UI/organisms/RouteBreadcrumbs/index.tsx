import Icon from "@Components/UI/atoms/Icon";
import Breadcrumb, { BreadcrumbProps } from "@Components/UI/molecules/Breadcrumb";

interface Props extends BreadcrumbProps {
  simple?: boolean; 
  icon?: string;
  name?: string; 
  href?: string;
  items: Array<Item>;
}

interface Item {
  icon?: string;
  name?: string;
  href: string;
}

const RouteBreadcrumbs = ({ simple, icon, name, href, items, ...rest }: Props) => {
  return (
    <Breadcrumb {...rest}>
      {simple ? (
        <Breadcrumb.Item href={href}>
          {icon && <Icon name={icon} className="pr-sm" />}
          {name && <span>{name}</span>}
        </Breadcrumb.Item>
      ) : items ? (
        items.map((item) => (
          <Breadcrumb.Item href={item.href}>
            {item.icon && <Icon name={item.icon} className="pr-sm" />}
            {item.name && <span>{item.name}</span>}
          </Breadcrumb.Item>
        ))
      ) : null}
    </Breadcrumb>
  );
};

export default RouteBreadcrumbs;
