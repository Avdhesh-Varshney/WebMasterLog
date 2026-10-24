import { SELECTED_ORG_KEY } from '../../config/env';
import { storage } from '../utils/storage';

/**
 * Access token lives in memory only. On reload the session is restored from the
 * httpOnly refresh_token cookie, so no bearer token is ever written to storage.
 */
let accessToken: string | null = null;

export const tokenStore = {
  getAccessToken: () => accessToken,
  setAccessToken: (token: string | null) => {
    accessToken = token;
  },
  getSelectedOrgId: () => storage.get(SELECTED_ORG_KEY),
  setSelectedOrgId: (orgId: string | null) => {
    if (orgId) storage.set(SELECTED_ORG_KEY, orgId);
    else storage.remove(SELECTED_ORG_KEY);
  },
};
