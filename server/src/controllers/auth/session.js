/**
 * GET /api/auth/session - Current user + active org memberships.
 * Accepts any valid access token (pre-org or org-scoped). Used by the client to
 * restore a session after reload (refresh -> session -> select-org) and to list
 * workspaces for the org switcher.
 */

import USER from '../../models/user.model.js';
import SUBSCRIBER from '../../models/subscriber.model.js';
import { sendResponse } from '../../utils/response.js';
import { listActiveMemberships } from './utils/index.js';

const session = async (req, res) => {
  const { user_id, subscriber_id } = req.user || {};
  if (!user_id) {
    return sendResponse(res, 401, 'Invalid token: missing user context');
  }

  try {
    const [user, subscriber, orgs] = await Promise.all([
      USER.findById(user_id)
        .select(
          'personal_info.fullname personal_info.username personal_info.profile_img'
        )
        .lean(),
      SUBSCRIBER.findById(subscriber_id).select('email').lean(),
      listActiveMemberships(user_id),
    ]);

    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    return sendResponse(res, 200, 'Session', {
      user: {
        id: user._id,
        fullname: user.personal_info?.fullname,
        username: user.personal_info?.username,
        email: subscriber?.email,
        profile_img: user.personal_info?.profile_img,
      },
      orgs,
    });
  } catch (err) {
    return sendResponse(res, 500, err.message || 'Internal Server Error');
  }
};

export default session;
