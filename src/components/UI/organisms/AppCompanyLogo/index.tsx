import { Link } from "react-router-dom";
import { ClassNameSizes } from "@Types/shared-types";
import { useUI } from "@Providers/UIProvider";
import Box, { BoxProps } from "@Components/UI/organisms/Box";
import Image from "@Components/UI/atoms/Image";
import "./index.less";

interface AppCompanyLogoProps extends BoxProps {
  size?: ClassNameSizes;
  to?: any;
  className?: string;
  logo: string;
}

const AppCompanyLogo = ({
  size = "md",
  to,
  className,
  logo,
  ...rest
}: AppCompanyLogoProps): JSX.Element => {
  return (
    <Box className={`app-company-logo app-company-logo-${size}`} {...rest}>
      {to ? (
        <Link to={to} className="app-company-logo-link p-none">
          <Image preview={false} src={logo} className="app-company-logo-link-image" />
        </Link>
      ) : (
        <img src={logo} />
      )}
    </Box>
  );
};

export default (props) => {
  const uiApi = useUI();

  return <AppCompanyLogo logo={uiApi.companyLogoUrl} {...props} />;
};
