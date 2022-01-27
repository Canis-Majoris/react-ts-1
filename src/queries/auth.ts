import endpoints from '@Modules/api/endpoints';
import request from '@Modules/api/request';
import { StatusCodes } from '@Types/api';
import axios from 'axios';

/* checkPreviewUserQuery */
interface LoginInfo {
  code: StatusCodes;
  data: {
    portalUserId: number;
  };
  success: boolean;
}

export const checkPreviewUserQuery = async ({
  portalUserId,
  idToken,
}): Promise<any> => {
  const { data } = await axios.post(
    endpoints.api.investor_portal.auth.check_preview_user,
    { portalUserId },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return data;
};

/* fetchLoginInfoQuery */
export const fetchLoginInfoQuery = async (): Promise<LoginInfo> => {
  const { data } = await request.get(
    endpoints.api.investor_portal.general.login_info
  );
  return data;
};

/* verifyCaptchaQuery */
export const verifyCaptchaQuery = async ({ body }): Promise<any> => {
  const { data } = await request.post(
    endpoints.api.investor_portal.auth.verify_captcha,
    body
  );
  return data;
};
