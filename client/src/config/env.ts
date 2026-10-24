import packageDetails from '../../package.json';

export const appVersion = packageDetails.version;

export const ORGANISATION_NAME =
  import.meta.env.VITE_ORGANISATION_NAME || 'Code A2Z';

export const VITE_SERVER_DOMAIN =
  import.meta.env.VITE_SERVER_DOMAIN || 'https://code-a2z-server.vercel.app';

/** localStorage key for the last selected workspace (org). */
export const SELECTED_ORG_KEY = 'selected_org_id';
