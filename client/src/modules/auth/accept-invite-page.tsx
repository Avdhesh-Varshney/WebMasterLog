import { FormEvent, useState } from 'react';
import { Form } from 'react-aria-components';
import { ArrowRight, LockSimple, User } from '@phosphor-icons/react';
import { useAuth } from '../../shared/auth/use-auth';
import { getErrorMessage } from '../../infra/rest';
import { getAcceptInviteInfo } from '../../infra/rest/apis/auth';
import { Button } from '../../shared/ui/button';
import { TextField } from '../../shared/ui/text-field';
import { ErrorAlert } from '../../shared/ui/alert';
import { passwordRule } from '../../shared/utils/validation';
import { AuthHeading, AuthLayout } from './auth-layout';
import { useTokenLink } from './use-token-link';
import { LinkInvalid, LinkLoading } from './link-states';

/** /accept-invite?token=… — link sent when an org admin invites a member. */
export default function AcceptInvitePage() {
  const { acceptInvite } = useAuth();
  const { token, state } = useTokenLink(getAcceptInviteInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(null);
    setLoading(true);
    try {
      await acceptInvite({
        token,
        fullname: String(form.get('fullname')).trim(),
        password: String(form.get('password')),
      });
    } catch (err) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {state.status === 'loading' && <LinkLoading />}
      {state.status === 'invalid' && <LinkInvalid message={state.message} />}
      {state.status === 'valid' && (
        <>
          <AuthHeading
            title={`Join ${state.orgName}`}
            subtitle="You've been invited. Set up your account to continue."
          />
          <Form onSubmit={onSubmit} className="flex flex-col gap-4">
            <ErrorAlert message={error} />
            <TextField
              name="fullname"
              label="Full name"
              placeholder="Ada Lovelace"
              autoComplete="name"
              icon={<User className="size-4" />}
              minLength={3}
              isRequired
              autoFocus
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="new-password"
              description="6–20 characters with uppercase, lowercase and a number. If you already have an account, this replaces your password."
              icon={<LockSimple className="size-4" />}
              validate={passwordRule}
              isRequired
            />
            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="mt-2 w-full"
            >
              Accept invite
              {!loading && <ArrowRight className="size-4" />}
            </Button>
          </Form>
        </>
      )}
    </AuthLayout>
  );
}
