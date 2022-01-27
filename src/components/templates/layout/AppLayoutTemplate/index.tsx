import { memo } from "react";
import Layout from "@Components/containers/shared/layout";
import AppHeader from "@Components/UI/organisms/AppHeader";
import AppFooter from "@Components/UI/organisms/AppFooter";
import PreviewBannerPanel from "@Features/auth/panels/PreviewBannerPanel";
import { useUI } from "@Providers/UIProvider";
import "./index.less";

export interface AppLayoutTemplateProps {
  children: any;
  hideHeader?: boolean;
  showPreviewBanner?: boolean;
}

const { Content } = Layout;

const AppLayoutTemplate = ({
  children,
  hideHeader,
  showPreviewBanner,
}: AppLayoutTemplateProps) => {
  const { language } = useUI();

  return (
    <>
      {showPreviewBanner && <PreviewBannerPanel />}
      <Layout
        className={`app-layout-template ${language || ""}`}
      >
        {!hideHeader && <AppHeader showPreviewBanner={showPreviewBanner} />}
        <Content className="app-layout-template-content">{children}</Content>
        <AppFooter />
      </Layout>
    </>
  );
};

export default memo(AppLayoutTemplate);
