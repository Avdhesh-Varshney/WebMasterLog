import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-aria-components';
import {
  ArrowRight,
  Buildings,
  EnvelopeSimple,
  Hash,
  PaperPlaneTilt,
  User,
} from '@phosphor-icons/react';
import { getErrorMessage } from '../../infra/rest';
import { requestOrganization } from '../../infra/rest/apis/organization';
import { Button } from '../../shared/ui/button';
import { TextField } from '../../shared/ui/text-field';
import { ErrorAlert } from '../../shared/ui/alert';
import { ROUTES } from '../../app/routes';
import { AuthHeading, AuthLayout } from './auth-layout';

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

export default function RequestOrgPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email')).trim();
    const requester = String(form.get('requester')).trim();
    setError(null);
    setLoading(true);
    try {
      const res = await requestOrganization({
        name: name.trim(),
        slug,
        requested_by_email: email,
        ...(requester && { requested_by_name: requester }),
      });
      if (res.status !== 'success') throw new Error(res.message);
      setSentTo(email);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (sentTo) {
    return (
      <AuthLayout>
        <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent">
          <PaperPlaneTilt className="size-5" weight="duotone" />
        </span>
        <AuthHeading
          title="Request submitted"
          subtitle={
            <>
              Once a platform admin approves <b>{name}</b>, we'll email{' '}
              <b>{sentTo}</b> a link to set your password.
            </>
          }
        />
        <Link
          to={ROUTES.LOGIN}
          className="text-sm font-medium text-accent hover:underline"
        >
          Back to sign in
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeading
        title="Request an organization"
        subtitle={
          <>
            Already invited?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-accent hover:underline"
            >
              Sign in
            </Link>
          </>
        }
      />
      <Form onSubmit={onSubmit} className="flex flex-col gap-4">
        <ErrorAlert message={error} />
        <TextField
          label="Organization name"
          placeholder="Acme Inc."
          autoComplete="organization"
          icon={<Buildings className="size-4" />}
          value={name}
          onChange={value => {
            setName(value);
            if (!slugEdited) setSlug(toSlug(value));
          }}
          maxLength={120}
          isRequired
          autoFocus
        />
        <TextField
          label="URL slug"
          placeholder="acme"
          description="Lowercase letters, numbers and hyphens."
          icon={<Hash className="size-4" />}
          value={slug}
          onChange={value => {
            setSlugEdited(true);
            setSlug(value.toLowerCase());
          }}
          validate={value =>
            !value || SLUG_REGEX.test(value)
              ? null
              : 'Use lowercase letters, numbers and single hyphens.'
          }
          isRequired
        />
        <TextField
          name="requester"
          label="Your name"
          placeholder="Ada Lovelace"
          autoComplete="name"
          icon={<User className="size-4" />}
        />
        <TextField
          name="email"
          type="email"
          label="Work email"
          placeholder="you@company.com"
          autoComplete="email"
          description="The approval link is sent here."
          icon={<EnvelopeSimple className="size-4" />}
          isRequired
        />
        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="mt-2 w-full"
        >
          Submit request
          {!loading && <ArrowRight className="size-4" />}
        </Button>
      </Form>
    </AuthLayout>
  );
}
