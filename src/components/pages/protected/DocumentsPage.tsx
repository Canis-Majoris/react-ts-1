import DocumentsProvider from "@Providers/DocumentsProvider";
import DocumentsPageTemplate from "@Components/templates/pages/DocumentsPageTemplate";

const DocumentsPage = () => {
  return (
    <DocumentsProvider>
      <DocumentsPageTemplate />
    </DocumentsProvider>
  );
};

export default DocumentsPage;
 