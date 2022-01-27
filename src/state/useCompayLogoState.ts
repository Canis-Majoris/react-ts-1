import { getCompanyLogoQuery } from "@Queries/general";
import { File } from "@Types/file";
import { useEffect, useState } from "react";

export interface useCompanyLogoStateData {
  code: number;
  data: File;
  success: boolean;
}

const useCompanyLogoState = (): useCompanyLogoStateData => {
  const [state, setState] = useState(null);

  useEffect(() => {
    getCompanyLogoQuery().then((res) => setState(res));
  }, []);
  return state;
};

export default useCompanyLogoState;
