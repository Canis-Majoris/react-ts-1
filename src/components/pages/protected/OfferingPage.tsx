import OfferingPageTemplate from '@Components/templates/pages/OfferingPageTemplate';
import OfferingProvider from '@Providers/OfferingProvider';

const OfferingPage = () => {
  return (
    <OfferingProvider>
      <OfferingPageTemplate />
    </OfferingProvider>
  );
};

export default OfferingPage;
