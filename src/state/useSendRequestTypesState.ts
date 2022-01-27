import { useQuery } from "react-query";
import { loadFromLocalStorage } from "@Utils/local-storage";
import { getSendRequestTypesQuery } from "@Queries/sendRequest";
import { AppCategory, StatusCodes } from "@Types/api";

export interface SendRequestTypes {
  code: StatusCodes;
  data: {
    requestStatuses: AppCategory[];
    requestSubjects: AppCategory[];
  };
  success: boolean;
}

const useSendRequestTypesState = () => {
  const portalUserId = loadFromLocalStorage("portalUserId", {
    isPrimitive: true,
  });
  return useQuery<SendRequestTypes>(
    ["sendRequest", "types"],
    () => getSendRequestTypesQuery(),
    {
      enabled: Boolean(portalUserId),
      retry: true,
    }
  );
};

export default useSendRequestTypesState;
