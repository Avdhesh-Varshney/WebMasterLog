import { ReactNode } from 'react';
import { Logo } from '../../shared/ui/logo';
import { ThemeToggle } from '../../shared/ui/theme-toggle';

const tenants = [
  { name: 'Northwind Labs', role: 'Owner', members: 24, hue: 275 },
  { name: 'Acme Platform', role: 'Admin', members: 112, hue: 160 },
  { name: 'Open Source Guild', role: 'Member', members: 8, hue: 40 },
];

/** Split layout: form on the left, product story on the right (desktop only). */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-full lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="flex flex-col px-4 py-6 sm:px-10">
        <header className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </header>
        <main className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-95">{children}</div>
        </main>
        <footer className="text-xs text-ink-faint">
          © {new Date().getFullYear()} Code A2Z · Open source
        </footer>
      </div>

      <aside className="relative hidden overflow-hidden border-l border-line bg-subtle lg:block">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 bg-[radial-gradient(var(--line-strong)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className="relative flex h-full flex-col justify-center px-14 xl:px-20">
          <p className="label-mono">Multi-tenant workspaces</p>
          <h2 className="mt-3 max-w-md text-[28px] leading-tight font-semibold tracking-tight text-balance">
            One account. Every organization you build with.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            Data, roles, and permissions are scoped per workspace. Switch
            between teams without signing out.
          </p>

          <div className="mt-10 flex max-w-sm flex-col gap-2.5">
            {tenants.map((t, i) => (
              <div
                key={t.name}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3 shadow-[0_1px_2px_rgb(0_0_0/0.04)]"
                style={{ marginLeft: i * 20 }}
              >
                <span
                  className="size-8 rounded-md"
                  style={{ background: `oklch(0.6 0.13 ${t.hue})` }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.members} members</p>
                </div>
                <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-ink-muted uppercase">
                  {t.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export function AuthHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <div className="mb-7">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p>
    </div>
  );
}
