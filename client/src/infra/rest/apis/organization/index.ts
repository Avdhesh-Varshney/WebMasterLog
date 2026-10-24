import { api } from '../..';
import type { ApiResponse } from '../../typings';
import type {
  RequestOrganizationPayload,
  RequestOrganizationResponseData,
} from './typing';

/** Public. Creates a pending org that a platform admin must approve. */
export const requestOrganization = async (
  payload: RequestOrganizationPayload
) =>
  (
    await api.post<ApiResponse<RequestOrganizationResponseData>>(
      '/api/organization/request',
      payload
    )
  ).data;
