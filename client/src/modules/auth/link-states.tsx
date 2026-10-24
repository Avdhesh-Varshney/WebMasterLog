import { Link } from 'react-router-dom';
import { LinkBreak } from '@phosphor-icons/react';
import { Spinner } from '../../shared/ui/spinner';
import { ROUTES } from '../../app/routes';

export function LinkLoading() {
  return (
    <div className="flex items-center gap-2 text-sm text-ink-muted">
      <Spinner className="size-4" />
      Checking your link…
    </div>
  );
}

export function LinkInvalid({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <span className="grid size-10 place-items-center rounded-lg bg-danger-soft text-danger">
        <LinkBreak className="size-5" />
      </span>
      <h1 className="mt-4 text-lg font-semibold tracking-tight">
        This link can't be used
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        {message} Ask your admin to send a new one.
      </p>
      <Link
        to={ROUTES.LOGIN}
        className="mt-5 inline-block text-sm font-medium text-accent hover:underline"
      >
        Back to sign in
      </Link>
    </div>
  );
}
