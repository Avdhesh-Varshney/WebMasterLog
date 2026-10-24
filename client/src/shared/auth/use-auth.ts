import { useContext } from 'react';
import { AuthContext } from './auth-context';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

/** For pages rendered only inside the app shell (status is always 'ready'). */
export const useActiveOrg = () => {
  const { state } = useAuth();
  if (state.status !== 'ready') {
    throw new Error('useActiveOrg requires a selected organization');
  }
  return state;
};
