import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './shared/auth/use-auth';
import { FullPageSpinner } from './shared/ui/spinner';
import { ROUTES } from './app/routes';
import { AppShell } from './app/app-shell';
import LoginPage from './modules/auth/login-page';
import RequestOrgPage from './modules/auth/request-org-page';
import AcceptInvitePage from './modules/auth/accept-invite-page';
import SetPasswordPage from './modules/auth/set-password-page';
import SelectOrgPage from './modules/auth/select-org-page';
import HomePage from './modules/home/home-page';

/**
 * Routing is derived from auth status, so a user can never land on a page
 * their session doesn't allow:
 *   signed-out -> login, request org, accept invite, set password
 *   (access is invite-only: there is no public signup)
 *   needs-org  -> workspace picker
 *   ready      -> app shell
 */
export default function App() {
  const { state } = useAuth();

  if (state.status === 'loading') return <FullPageSpinner />;

  if (state.status === 'signed-out') {
    return (
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REQUEST_ORG} element={<RequestOrgPage />} />
        <Route path={ROUTES.ACCEPT_INVITE} element={<AcceptInvitePage />} />
        <Route path={ROUTES.SET_PASSWORD} element={<SetPasswordPage />} />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    );
  }

  if (state.status === 'needs-org') {
    return (
      <Routes>
        <Route path={ROUTES.SELECT_ORG} element={<SelectOrgPage />} />
        <Route path="*" element={<Navigate to={ROUTES.SELECT_ORG} replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
