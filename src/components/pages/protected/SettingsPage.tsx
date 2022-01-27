import SettingsPageTemplate from "@Components/templates/pages/SettingsPageTemplate";
import SettingsProvider from "@Providers/SettingsProvder";

const SettingsPage = () => {
  return (
    <SettingsProvider>
      <SettingsPageTemplate />
    </SettingsProvider>
  );
};

export default SettingsPage;
