import {
  getTemplateMergefieldsQuery,
  TemplateMergeFieldsQueryFilters,
} from "@Queries/subscription";
import { loadFromLocalStorage } from "@Utils/local-storage";
import { useQuery } from "react-query";

export interface TemplateMergefieldsState {
  code: number;
  success: boolean;
  data: {
    offeringTemplatesMergeFields: string[];
  };
}

const useTemplateMergefieldsState = (
  filters: TemplateMergeFieldsQueryFilters
) => {
  const { userProfileId, offeringId, subscriptionId } = filters;
  const portalUserId = loadFromLocalStorage("portalUserId", {
    isPrimitive: true,
  });
  return useQuery<TemplateMergefieldsState>(
    ["template", "merge_fields", { filters }],
    () => getTemplateMergefieldsQuery({ portalUserId, ...filters }),
    {
      enabled:
        Boolean(portalUserId) &&
        Boolean(userProfileId) &&
        Boolean(offeringId) &&
        Boolean(subscriptionId),
    }
  );
};

export default useTemplateMergefieldsState;
