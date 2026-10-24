import { FormEvent, useState } from 'react';
import { Form } from 'react-aria-components';
import { ArrowRight, LockSimple, User } from '@phosphor-icons/react';
import { useAuth } from '../../shared/auth/use-auth';
import { getErrorMessage } from '../../infra/rest';
import { getSetPasswordInfo } from '../../infra/rest/apis/auth';
import { Button } from '../../shared/ui/button';
import { TextField } from '../../shared/ui/text-field';
import { ErrorAlert } from '../../shared/ui/alert';
import { passwordRule } from '../../shared/utils/validation';
import { AuthHeading, AuthLayout } from './auth-layout';
import { useTokenLink } from './use-token-link';
import { LinkInvalid, LinkLoading } from './link-states';

export default function SetPasswordPage() {
  const { setPasswordAfterApproval } = useAuth();
  const { token, state } = useTokenLink(getSetPasswordInfo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fullname = String(form.get('fullname') ?? '').trim();
    setError(null);
    setLoading(true);
    try {
      await setPasswordAfterApproval({
        token,
        password: String(form.get('password')),
        ...(fullname && { fullname }),
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
            title={`${state.orgName} is approved`}
            subtitle="Set a password to finish setting up your organization. You'll be its owner."
          />
          <Form onSubmit={onSubmit} className="flex flex-col gap-4">
            <ErrorAlert message={error} />
            <TextField
              name="fullname"
              label="Full name"
              placeholder="Ada Lovelace"
              autoComplete="name"
              description="Optional. Defaults to the name on your request."
              icon={<User className="size-4" />}
              autoFocus
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="new-password"
              description="6–20 characters with uppercase, lowercase and a number."
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
              Set password
              {!loading && <ArrowRight className="size-4" />}
            </Button>
          </Form>
        </>
      )}
    </AuthLayout>
  );
}
