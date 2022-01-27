import Loading from "@Components/UI/molecules/Loading";
import { useUI } from "@Providers/UIProvider";
import "./index.less";

const AppLoading = () => {
  const { colors } = useUI();

  return (
    <div className="app-loading">
      <Loading size={64} style={{ color: colors?.primaryColor }} />
    </div>
  );
};

export default AppLoading;
