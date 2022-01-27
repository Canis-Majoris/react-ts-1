export default {
  api: {
    base: 'api',
    api_pre_auth: 'api/ip-cred/pre-auth',
    public: {
      settings: 'api/public/settings/all',
    },
    portal: {
      base: 'api/investor-portal',
      auth: {
        base: 'api/investor-portal/auth',
        check_preview_user: 'api/investor-portal/auth/check-preview-user',
        verify_captcha: 'api/public/auth/captcha/verify',
      },
      general: {
        base: 'api/investor-portal/general',
        login_info: 'api/investor-portal/general/login-info',
        user_type: 'api/investor-portal/general/user/type',
        contact_accounts: 'api/investor-portal/general/contact/accounts',
        client_settings: {
          base: 'api/investor-portal/general/client-settings',
          all: 'api/investor-portal/general/client-settings/all',
        },
      },
      offering: {
        base: 'api/investor-portal/offering',
        all: 'api/investor-portal/offering/all',
        get: ({ portalUserId, offeringId }) =>
          `api/investor-portal/offering/${portalUserId}/${offeringId}`,
        documents: ({ offeringId }) =>
          `api/investor-portal/docs/offering/documents/${offeringId}`,
      },
    },
    app_category: {
      base: 'api/app-category',
      get: ({ categoryKey }) => `api/app-category/get-category/${categoryKey}`,
    },
  },
};
