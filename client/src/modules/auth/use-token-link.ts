import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getErrorMessage } from '../../infra/rest';
import type { ApiResponse } from '../../infra/rest/typings';
import type { TokenInfoResponseData } from '../../infra/rest/apis/auth/typing';

type LinkState =
  | { status: 'loading' }
  | { status: 'invalid'; message: string }
  | { status: 'valid'; orgName: string };

export function useTokenLink(
  fetchInfo: (token: string) => Promise<ApiResponse<TokenInfoResponseData>>
) {
  const [params] = useSearchParams();
  const token = params.get('token')?.trim() ?? '';
  const [state, setState] = useState<LinkState>(
    token
      ? { status: 'loading' }
      : { status: 'invalid', message: 'This link is missing its token.' }
  );

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetchInfo(token)
      .then(res => {
        if (cancelled) return;
        setState(
          res.status === 'success' && res.data
            ? { status: 'valid', orgName: res.data.org_name }
            : { status: 'invalid', message: res.message }
        );
      })
      .catch(err => {
        if (!cancelled) {
          setState({ status: 'invalid', message: getErrorMessage(err) });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [token, fetchInfo]);

  return { token, state };
}
