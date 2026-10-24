import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as authApi from '../../infra/rest/apis/auth';
import { setSessionRenewer } from '../../infra/rest';
import type { ApiResponse } from '../../infra/rest/typings';
import type {
  AuthSessionData,
  AuthUser,
  OrgMembership,
} from '../../infra/rest/apis/auth/typing';
import { AuthContext, AuthState, type AuthContextValue } from './auth-context';
import { tokenStore } from './token-store';

const unwrap = <T,>(res: { status: string; message: string; data?: T }) => {
  if (res.status !== 'success' || !res.data) throw new Error(res.message);
  return res.data;
};

const pickOrg = (orgs: OrgMembership[]) => {
  const stored = tokenStore.getSelectedOrgId();
  if (stored && orgs.some(o => o.org_id === stored)) return stored;
  return orgs.length === 1 ? orgs[0].org_id : null;
};

/**
 * Single source of truth for the session.
 *
 * Flow: login / accept-invite / set-password -> pre-org token + org list -> select-org -> org-scoped token.
 * Reload: refresh cookie -> pre-org token -> session (orgs) -> select last org.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: 'loading' });
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const signOutLocally = useCallback(() => {
    tokenStore.setAccessToken(null);
    setState({ status: 'signed-out' });
  }, []);

  const enterOrg = useCallback(
    async (orgId: string, user: AuthUser, orgs: OrgMembership[]) => {
      const data = unwrap(await authApi.selectOrg({ org_id: orgId }));
      tokenStore.setAccessToken(data.access_token);
      tokenStore.setSelectedOrgId(data.org.org_id);
      setState({
        status: 'ready',
        user: { ...user, ...data.user },
        orgs,
        org: {
          ...data.org,
          role: data.role,
          permissions: data.permissions ?? [],
          features: data.org_features ?? [],
        },
      });
    },
    []
  );

  const startSession = useCallback(
    async ({ user, orgs }: Pick<AuthSessionData, 'user' | 'orgs'>) => {
      const orgId = pickOrg(orgs);
      if (orgId) {
        try {
          await enterOrg(orgId, user, orgs);
          return;
        } catch {
          tokenStore.setSelectedOrgId(null);
        }
      }
      setState({ status: 'needs-org', user, orgs });
    },
    [enterOrg]
  );

  /** Any endpoint that answers with a pre-org session (login, invite, set-password). */
  const signIn = useCallback(
    async (request: Promise<ApiResponse<AuthSessionData>>) => {
      const data = unwrap(await request);
      tokenStore.setAccessToken(data.access_token);
      await startSession(data);
    },
    [startSession]
  );

  /** Get a fresh pre-org token from the refresh cookie. */
  const refreshPreOrg = useCallback(async () => {
    const data = unwrap(await authApi.refreshToken());
    tokenStore.setAccessToken(data.access_token);
  }, []);

  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    (async () => {
      try {
        await refreshPreOrg();
        await startSession(unwrap(await authApi.getSession()));
      } catch {
        signOutLocally();
      }
    })();
  }, [refreshPreOrg, startSession, signOutLocally]);

  useEffect(() => {
    setSessionRenewer(async () => {
      const current = stateRef.current;
      try {
        await refreshPreOrg();
        if (current.status === 'ready') {
          const data = unwrap(
            await authApi.selectOrg({ org_id: current.org.org_id })
          );
          tokenStore.setAccessToken(data.access_token);
        }
        return true;
      } catch {
        signOutLocally();
        return false;
      }
    });
    return () => setSessionRenewer(null);
  }, [refreshPreOrg, signOutLocally]);

  const value = useMemo<AuthContextValue>(
    () => ({
      state,
      login: async payload => {
        await signIn(authApi.login(payload));
      },
      acceptInvite: async payload => {
        await signIn(authApi.acceptInvite(payload));
      },
      setPasswordAfterApproval: async payload => {
        await signIn(authApi.setPasswordAfterApproval(payload));
      },
      selectOrg: async orgId => {
        const current = stateRef.current;
        if (current.status === 'loading' || current.status === 'signed-out') {
          return;
        }
        // select-org only accepts a pre-org token; swap first when switching.
        if (current.status === 'ready') await refreshPreOrg();
        await enterOrg(orgId, current.user, current.orgs);
      },
      logout: async () => {
        try {
          await authApi.logout();
        } catch {
          /* cookie cleared server side when reachable; local logout regardless */
        }
        tokenStore.setSelectedOrgId(null);
        signOutLocally();
      },
    }),
    [state, signIn, enterOrg, refreshPreOrg, signOutLocally]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
