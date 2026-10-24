import { createContext } from 'react';
import type {
  AuthUser,
  LoginPayload,
  OrgMembership,
  SelectOrgResponseData,
  AcceptInvitePayload,
  SetPasswordPayload,
} from '../../infra/rest/apis/auth/typing';

export type ActiveOrg = SelectOrgResponseData['org'] & {
  role: string;
  permissions: string[];
  features: string[];
};

export type AuthState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'needs-org'; user: AuthUser; orgs: OrgMembership[] }
  | {
      status: 'ready';
      user: AuthUser;
      orgs: OrgMembership[];
      org: ActiveOrg;
    };

export interface AuthContextValue {
  state: AuthState;
  login: (payload: LoginPayload) => Promise<void>;
  acceptInvite: (payload: AcceptInvitePayload) => Promise<void>;
  setPasswordAfterApproval: (payload: SetPasswordPayload) => Promise<void>;
  selectOrg: (orgId: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
