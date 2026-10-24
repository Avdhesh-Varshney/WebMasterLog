import express from 'express';

import authLimiter from '../../middlewares/auth.limiter.js';

import authenticateUser, {
  authenticatePreOrgUser,
} from '../../middlewares/auth.middleware.js';

import signup from '../../controllers/auth/signup.js';
import login from '../../controllers/auth/login.js';
import selectOrg from '../../controllers/auth/select-org.js';
import changePassword from '../../controllers/auth/change-password.js';
import refresh from '../../controllers/auth/refresh.js';
import logout from '../../controllers/auth/logout.js';
import session from '../../controllers/auth/session.js';
import getAcceptInvite from '../../controllers/auth/get-accept-invite.js';
import postAcceptInvite from '../../controllers/auth/post-accept-invite.js';
import getSetPassword from '../../controllers/auth/get-set-password.js';
import postSetPasswordAfterApproval from '../../controllers/auth/post-set-password-after-approval.js';

const authRoutes = express.Router();

// Brute-force protection only on credential endpoints. Session endpoints
// (refresh, session, select-org, logout) run on every page load.

authRoutes.get('/accept-invite', getAcceptInvite);
authRoutes.post('/accept-invite', authLimiter, postAcceptInvite);
authRoutes.get('/set-password', getSetPassword);
authRoutes.post(
  '/set-password-after-approval',
  authLimiter,
  postSetPasswordAfterApproval
);
authRoutes.post('/signup', authLimiter, signup);
authRoutes.post('/login', authLimiter, login);
authRoutes.post('/refresh', refresh);
authRoutes.get('/session', authenticateUser, session);
authRoutes.post(
  '/select-org',
  authenticateUser,
  authenticatePreOrgUser,
  selectOrg
);
authRoutes.post('/logout', logout);
authRoutes.patch('/change-password', authenticateUser, changePassword);

export default authRoutes;
