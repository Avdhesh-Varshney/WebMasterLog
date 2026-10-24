export interface LoginPayload {
  email: string;
  password: string;
}

export interface SelectOrgPayload {
  org_id: string;
}

/** Limited user returned by login, signup, and select-org. */
export interface AuthUser {
  id: string;
  fullname?: string;
  username?: string;
  email?: string;
  profile_img?: string;
}

/** Organization membership returned by login / signup. */
export interface OrgMembership {
  org_id: string;
  name: string;
  role: string;
}

/** Pre-org session: token can only be used for select-org. */
export interface AuthSessionData {
  user: AuthUser;
  orgs: OrgMembership[];
  access_token: string;
}

export interface SelectOrgResponseData {
  access_token: string;
  user: AuthUser;
  role: string;
  permissions: string[];
  org_features: string[];
  org: { org_id: string; name: string; slug: string };
}

/** GET /api/auth/session: who is signed in and which orgs they belong to. */
export interface SessionResponseData {
  user: AuthUser;
  orgs: OrgMembership[];
}

/** GET accept-invite / set-password: org the token belongs to. */
export interface TokenInfoResponseData {
  org_name: string;
}

export interface AcceptInvitePayload {
  token: string;
  fullname: string;
  password: string;
}

export interface SetPasswordPayload {
  token: string;
  password: string;
  fullname?: string;
}
