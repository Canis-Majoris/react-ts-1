import SubscriptionPageTemplate from '@Components/templates/pages/SubscriptionPageTemplate';
import SubscriptionProvider from '@Providers/SubscriptionProvider';

const SubscriptionPage = () => {
  return (
    <SubscriptionProvider>
      <SubscriptionPageTemplate />
    </SubscriptionProvider>
  );
};

export default SubscriptionPage;
