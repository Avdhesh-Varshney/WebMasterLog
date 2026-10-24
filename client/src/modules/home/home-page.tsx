import {
  ChatsCircle,
  Code,
  Files,
  NotePencil,
  ShieldCheck,
  UsersThree,
  type Icon,
} from '@phosphor-icons/react';
import { useActiveOrg } from '../../shared/auth/use-auth';

const FEATURE_META: Record<string, { label: string; icon: Icon }> = {
  articles: { label: 'Articles', icon: Files },
  chats: { label: 'Chats', icon: ChatsCircle },
  notes: { label: 'Notes', icon: NotePencil },
  code: { label: 'Code', icon: Code },
  collaboration: { label: 'Collaboration', icon: UsersThree },
};

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="label-mono">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-tight capitalize">
        {value}
      </p>
    </div>
  );
}

export default function HomePage() {
  const { user, org, orgs } = useActiveOrg();
  const firstName = (user.fullname || user.username || '').split(' ')[0];
  const features = org.features.filter(f => f in FEATURE_META);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
      <p className="label-mono">{org.name}</p>
      <h1 className="mt-2 text-[26px] font-semibold tracking-tight">
        Welcome{firstName ? `, ${firstName}` : ''}
      </h1>
      <p className="mt-1 text-sm text-ink-muted">
        Here's what's set up in this workspace.
      </p>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="Your role" value={org.role} />
        <Stat label="Permissions" value={org.permissions.length} />
        <Stat label="Workspaces" value={orgs.length} />
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
        <header className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h2 className="text-sm font-semibold">Enabled features</h2>
          <span className="flex items-center gap-1.5 text-xs text-ink-muted">
            <ShieldCheck className="size-3.5 text-success" weight="fill" />
            Scoped to {org.slug}
          </span>
        </header>
        {features.length === 0 ? (
          <p className="px-5 py-6 text-sm text-ink-muted">
            No features enabled.
          </p>
        ) : (
          <ul className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
            {features.map(f => {
              const { label, icon: FeatureIcon } = FEATURE_META[f];
              return (
                <li
                  key={f}
                  className="flex items-center gap-3 border-r border-b border-line px-5 py-4"
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
                    <FeatureIcon className="size-4" weight="duotone" />
                  </span>
                  <span className="text-[13px] font-medium">{label}</span>
                  <span className="ml-auto label-mono">Soon</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
