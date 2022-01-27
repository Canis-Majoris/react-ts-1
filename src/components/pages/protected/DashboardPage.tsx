import DashboardProvider from '@Providers/DashboardProvider';
import DashboarPageTemplate from '@Components/templates/pages/DashboarPageTemplate';

const DashboardPage = () => {
  return (
    <DashboardProvider>
      <DashboarPageTemplate />
    </DashboardProvider>
  );
};

export default DashboardPage;
