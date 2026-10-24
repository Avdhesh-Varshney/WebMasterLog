import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-aria-components';
import { ArrowRight, EnvelopeSimple, LockSimple } from '@phosphor-icons/react';
import { useAuth } from '../../shared/auth/use-auth';
import { getErrorMessage } from '../../infra/rest';
import { Button } from '../../shared/ui/button';
import { TextField } from '../../shared/ui/text-field';
import { ErrorAlert } from '../../shared/ui/alert';
import { ROUTES } from '../../app/routes';
import { AuthHeading, AuthLayout } from './auth-layout';

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(null);
    setLoading(true);
    try {
      await login({
        email: String(form.get('email')).trim(),
        password: String(form.get('password')),
      });
    } catch (err) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeading
        title="Sign in"
        subtitle="Use the email your organization invited."
      />
      <Form onSubmit={onSubmit} className="flex flex-col gap-4">
        <ErrorAlert message={error} />
        <TextField
          name="email"
          type="email"
          label="Work email"
          placeholder="you@company.com"
          autoComplete="email"
          icon={<EnvelopeSimple className="size-4" />}
          isRequired
          autoFocus
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          icon={<LockSimple className="size-4" />}
          isRequired
        />
        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="mt-2 w-full"
        >
          Continue
          {!loading && <ArrowRight className="size-4" />}
        </Button>
      </Form>
      <p className="mt-6 border-t border-line pt-5 text-[13px] text-ink-muted">
        No invite yet?{' '}
        <Link
          to={ROUTES.REQUEST_ORG}
          className="font-medium text-accent hover:underline"
        >
          Request an organization
        </Link>
      </p>
    </AuthLayout>
  );
}
