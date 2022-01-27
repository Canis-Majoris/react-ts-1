import InvestmentPageTemplate from '@Components/templates/pages/InvestmentPageTemplate';
import InvestmentProvider from '@Providers/InvestmentProvider';

const InvestmentPage = () => {
  return (
    <InvestmentProvider>
      <InvestmentPageTemplate />
    </InvestmentProvider>
  );
};

export default InvestmentPage;
