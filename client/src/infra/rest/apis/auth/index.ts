import { api } from '../..';
import type { ApiResponse, BaseApiResponse } from '../../typings';
import type {
  AuthSessionData,
  LoginPayload,
  SelectOrgPayload,
  SelectOrgResponseData,
  SessionResponseData,
  AcceptInvitePayload,
  SetPasswordPayload,
  TokenInfoResponseData,
} from './typing';

export const login = async (payload: LoginPayload) =>
  (await api.post<ApiResponse<AuthSessionData>>('/api/auth/login', payload))
    .data;

export const selectOrg = async (payload: SelectOrgPayload) =>
  (
    await api.post<ApiResponse<SelectOrgResponseData>>(
      '/api/auth/select-org',
      payload
    )
  ).data;

export const refreshToken = async () =>
  (
    await api.post<ApiResponse<Pick<AuthSessionData, 'access_token'>>>(
      '/api/auth/refresh'
    )
  ).data;

export const logout = async () =>
  (await api.post<BaseApiResponse>('/api/auth/logout')).data;

export const getSession = async () =>
  (await api.get<ApiResponse<SessionResponseData>>('/api/auth/session')).data;

const tokenQuery = (token: string) => `?token=${encodeURIComponent(token)}`;

export const getAcceptInviteInfo = async (token: string) =>
  (
    await api.get<ApiResponse<TokenInfoResponseData>>(
      `/api/auth/accept-invite${tokenQuery(token)}`
    )
  ).data;

/** Creates (or updates) the user, joins the org, and signs them in. */
export const acceptInvite = async (payload: AcceptInvitePayload) =>
  (
    await api.post<ApiResponse<AuthSessionData>>(
      '/api/auth/accept-invite',
      payload
    )
  ).data;

export const getSetPasswordInfo = async (token: string) =>
  (
    await api.get<ApiResponse<TokenInfoResponseData>>(
      `/api/auth/set-password${tokenQuery(token)}`
    )
  ).data;

/** After an org request is approved: set password, become owner, sign in. */
export const setPasswordAfterApproval = async (payload: SetPasswordPayload) =>
  (
    await api.post<ApiResponse<AuthSessionData>>(
      '/api/auth/set-password-after-approval',
      payload
    )
  ).data;
