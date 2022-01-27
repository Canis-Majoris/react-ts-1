import Image from "@Components/UI/atoms/Image";
import LanguageSwitcher from "@Components/UI/organisms/LanguageSwitcher";
import { useUI } from "@Providers/UIProvider";
import "./index.less";

const AuthPageTemplate = ({ children, logo }) => {
  return (
    <div className="auth-page-template">
      <div className="auth-page-template-header">
        {logo && (
          <Image
            src={logo}
            preview={false}
            className="auth-page-template-header-logo"
          />
        )}
      </div>
      <div className="auth-page-template-content">{children}</div>
      <div className="auth-page-template-toolbar">
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default (props) => {
  const ui = useUI();

  return <AuthPageTemplate logo={ui.companyLogoUrl} {...props} />;
};
