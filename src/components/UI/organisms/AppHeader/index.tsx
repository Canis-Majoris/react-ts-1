import Layout, { LayoutProps } from "@Components/containers/shared/layout";
import AppCompanyLogo from "@Components/UI/organisms/AppCompanyLogo";
import AppHeaderMenu from "./menu";
import AppHeaderToolbar from "./toolbar";
import { useUI } from "@Providers/UIProvider";
import { useTranslation } from "react-i18next";
import "./index.less";

const { Header } = Layout;

export interface AppHeaderProps extends LayoutProps {
  showPreviewBanner: boolean;
}

const AppHeader = ({ showPreviewBanner }: AppHeaderProps) => {
  const { width } = useUI();
  const { i18n } = useTranslation();
  const language = i18n?.language;
  return (
    <Header
      className={`app-header border-bottom justify-content-between ${
        showPreviewBanner ? "preview" : ""
      } ${width < 915 ? (language === "he" ? "pl-none" : "pr-none") : ""}`}
    >
      <AppCompanyLogo mr="md" to="/" />
      {width > 915 && <AppHeaderMenu px="xl" />}
      <AppHeaderToolbar />
    </Header>
  );
};

export default AppHeader;
