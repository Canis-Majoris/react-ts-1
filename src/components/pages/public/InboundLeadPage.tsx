import InboundLeadPageTemplate from "@Components/templates/pages/InboundLeadPageTemplate";
import InboundLeadProvider from "@Providers/InboundLeadProvider";

const InboundLeadPage = () => {
  return (
    <InboundLeadProvider>
      <InboundLeadPageTemplate />
    </InboundLeadProvider>
  );
};

export default InboundLeadPage;
