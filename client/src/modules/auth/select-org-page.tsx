import { useState } from 'react';
import { CaretRight, SignOut } from '@phosphor-icons/react';
import { Button as AriaButton } from 'react-aria-components';
import { useAuth } from '../../shared/auth/use-auth';
import { getErrorMessage } from '../../infra/rest';
import { Avatar } from '../../shared/ui/avatar';
import { Button } from '../../shared/ui/button';
import { Spinner } from '../../shared/ui/spinner';
import { ErrorAlert } from '../../shared/ui/alert';
import { AuthHeading, AuthLayout } from './auth-layout';

export default function SelectOrgPage() {
  const { state, selectOrg, logout } = useAuth();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (state.status !== 'needs-org') return null;
  const { user, orgs } = state;

  const choose = async (orgId: string) => {
    setError(null);
    setPendingId(orgId);
    try {
      await selectOrg(orgId);
    } catch (err) {
      setError(getErrorMessage(err));
      setPendingId(null);
    }
  };

  return (
    <AuthLayout>
      <AuthHeading
        title="Choose a workspace"
        subtitle={<>Signed in as {user.email ?? user.fullname}</>}
      />
      <ErrorAlert message={error} className="mb-4" />
      {orgs.length === 0 ? (
        <p className="rounded-xl border border-dashed border-line-strong p-5 text-sm text-ink-muted">
          You're not a member of any organization yet. Ask an admin to invite
          you.
        </p>
      ) : (
        <ul className="overflow-hidden rounded-xl border border-line bg-surface">
          {orgs.map(org => (
            <li
              key={org.org_id}
              className="border-b border-line last:border-b-0"
            >
              <AriaButton
                onPress={() => choose(org.org_id)}
                isDisabled={pendingId !== null}
                className="flex w-full cursor-default items-center gap-3 px-3.5 py-3 text-left outline-none data-disabled:opacity-60 data-focus-visible:bg-subtle data-hovered:bg-subtle"
              >
                <Avatar name={org.name} shape="square" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {org.name}
                  </span>
                  <span className="label-mono">{org.role}</span>
                </span>
                {pendingId === org.org_id ? (
                  <Spinner className="size-4 text-ink-faint" />
                ) : (
                  <CaretRight className="size-4 text-ink-faint" />
                )}
              </AriaButton>
            </li>
          ))}
        </ul>
      )}
      <Button variant="ghost" size="sm" className="mt-5" onPress={logout}>
        <SignOut className="size-4" />
        Sign out
      </Button>
    </AuthLayout>
  );
}
