import { useUI } from "@Providers/UIProvider";
import "./index.less";

const AuthBakcground = ({ background }) => {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="auth-background-image"
    ></div>
  );
};

export default () => {
  const uiApi = useUI();
  return <AuthBakcground background={uiApi.companyBackgroundUrl} />;
};
