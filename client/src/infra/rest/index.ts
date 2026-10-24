import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { VITE_SERVER_DOMAIN } from '../../config/env';
import { tokenStore } from '../../shared/auth/token-store';
import type { BaseApiResponse } from './typings';

export const api = axios.create({
  baseURL: VITE_SERVER_DOMAIN,
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = tokenStore.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let sessionRenewer: (() => Promise<boolean>) | null = null;
let renewing: Promise<boolean> | null = null;

export const setSessionRenewer = (fn: (() => Promise<boolean>) | null) => {
  sessionRenewer = fn;
};

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    const isAuthEndpoint = original?.url?.startsWith('/api/auth/');

    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      isAuthEndpoint ||
      !sessionRenewer
    ) {
      return Promise.reject(error);
    }

    original._retry = true;
    renewing ??= sessionRenewer().finally(() => {
      renewing = null;
    });

    if (await renewing) return api(original);
    return Promise.reject(error);
  }
);

export const getErrorMessage = (
  error: unknown,
  fallback = 'Something went wrong. Please try again.'
) => {
  if (axios.isAxiosError<BaseApiResponse>(error)) {
    if (!error.response)
      return 'Cannot reach the server. Check your connection.';
    return error.response.data?.message || fallback;
  }
  return error instanceof Error ? error.message : fallback;
};
