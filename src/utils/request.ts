import { UserTokenData } from '@Types/api';
import { loadFromLocalStorage } from '@Utils/local-storage';

export const getUserTokenData = (): UserTokenData => {
  const token = loadFromLocalStorage('id_token', { isPrimitive: true });
  return { token };
};
