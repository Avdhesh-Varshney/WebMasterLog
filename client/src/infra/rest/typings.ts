export type ResponseStatus = 'success' | 'error' | 'warning' | 'info';

export interface BaseApiResponse {
  status: ResponseStatus;
  message: string;
}

export interface ApiResponse<T> extends BaseApiResponse {
  data?: T;
}
