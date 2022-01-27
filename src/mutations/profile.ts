import {
  postSelfAccrediation,
  postCreateProfile,
  putEditPaymentMethod,
  postEditProfile,
} from '@Queries/settings';
import message from '@Tools/message';
import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';

const addProfileMessageKey = 'addProfileMessage';
const editProfileMessageKey = 'editProfileMessage';
const managePaymentMethodMessageKey = 'editPaymentMethodMessage';

export const useAddProfile = ({ onClose }) => {
  const QueryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(
    ({ profile }: { profile: any }) => postCreateProfile({ profile }),
    {
      onMutate: () =>
        message.loading({
          content: 'Adding Profile',
          key: addProfileMessageKey,
        }),
      onSuccess: ({ data }) => {
        if (data.success) {
          QueryClient.refetchQueries('profiles');
          message.success({
            content: t('profile_added'),
            key: addProfileMessageKey,
          });

          onClose && onClose();
        } else {
          message.error({ content: data?.message, key: addProfileMessageKey });
        }
      },
      onError: (error: any) => {
        message.error({ content: error?.message, key: addProfileMessageKey });
      },
    }
  );
};

export const useEditProfile = ({ onClose }) => {
  const QueryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(
    ({ profile }: { profile: any }) => postEditProfile({ profile }),
    {
      onMutate: () =>
        message.loading({
          content: 'Editing Profile',
          key: editProfileMessageKey,
        }),
      onSuccess: ({ data }) => {
        if (data.success) {
          message.success({ content: t('profile_edited') });
          QueryClient.refetchQueries('profiles');
          onClose && onClose();
        } else {
          message.error({ content: data?.message, key: editProfileMessageKey });
        }
      },
      onError: (error: any) => {
        message.error({ content: error?.message, key: editProfileMessageKey });
      },
    }
  );
};

export const useManagePaymentMethod = ({ onClose }) => {
  const QueryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(
    ({ paymentMethod }: { paymentMethod: any }) =>
      putEditPaymentMethod({ paymentMethod }),
    {
      onMutate: () =>
        message.loading({
          content: 'Editing Payment Method',
          key: managePaymentMethodMessageKey,
        }),
      onSuccess: ({ data }) => {
        if (data.success) {
          message.success({ content: t('payment_method_edited') });
          QueryClient.refetchQueries('profiles');
          onClose && onClose();
        } else {
          message.error({
            content: data?.message,
            key: managePaymentMethodMessageKey,
          });
        }
      },
      onError: (error: any) => {
        message.error({
          content: error?.message,
          key: managePaymentMethodMessageKey,
        });
      },
    }
  );
};
