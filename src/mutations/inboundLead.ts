import { postSubmitInboundLeadFormQuery } from "@Queries/inboundLead";
import message from "@Tools/message";
import notification from "@Tools/notification";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";

const submitInboundLeadKey = "submitInboundLead";

export const useSubmitInboundLead = ({
  action,
}: {
  action: (isAutomatic: boolean) => void;
}) => {
  const { t } = useTranslation();
  return useMutation(
    ({ form }: { form: any }) => postSubmitInboundLeadFormQuery({ form }),
    {
      onMutate: () =>
        message.loading({
          content: t("general_submitting_form"),
          key: submitInboundLeadKey,
        }),
      onSuccess: (data) => {
        if (data.success) {
          notification.success({
            placement: "bottomRight",
            key: submitInboundLeadKey,
            message: "Form Submitted",
          });
          const isAutomatic = Boolean(data?.isAutomatic);
          action(isAutomatic);
        } else {
          message.error({ content: data?.message, key: submitInboundLeadKey });
        }
      },
      onError: (error: any) => {
        message.error({ content: error?.message, key: submitInboundLeadKey });
      },
    }
  );
};
