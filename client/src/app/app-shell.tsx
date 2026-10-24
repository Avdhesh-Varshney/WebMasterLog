import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Button as AriaButton, MenuTrigger } from 'react-aria-components';
import {
  CaretUpDown,
  Check,
  House,
  MagnifyingGlass,
  SignOut,
  type Icon,
} from '@phosphor-icons/react';
import { useActiveOrg, useAuth } from '../shared/auth/use-auth';
import { Avatar } from '../shared/ui/avatar';
import { LogoMark } from '../shared/ui/logo';
import { Menu, MenuItem, MenuPopover, MenuSeparator } from '../shared/ui/menu';
import { ThemeToggle } from '../shared/ui/theme-toggle';
import { Spinner } from '../shared/ui/spinner';
import { cn } from '../shared/utils/cn';
import { appVersion } from '../config/env';
import { ROUTES } from './routes';

/** Sidebar navigation. Add new modules here. */
const NAV: { label: string; to: string; icon: Icon }[] = [
  { label: 'Overview', to: ROUTES.HOME, icon: House },
];

function WorkspaceSwitcher() {
  const { org, orgs } = useActiveOrg();
  const { selectOrg } = useAuth();
  const [switching, setSwitching] = useState(false);

  const onSwitch = async (orgId: string) => {
    if (orgId === org.org_id) return;
    setSwitching(true);
    try {
      await selectOrg(orgId);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <MenuTrigger>
      <AriaButton className="flex w-full cursor-default items-center gap-2.5 rounded-lg p-1.5 text-left outline-none data-focus-visible:ring-2 data-focus-visible:ring-accent data-hovered:bg-subtle data-pressed:bg-subtle">
        <Avatar name={org.name} shape="square" className="size-7" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold">
            {org.name}
          </span>
          <span className="block truncate text-[11px] text-ink-muted">
            <span className="capitalize">{org.role}</span> · {org.slug}
          </span>
        </span>
        {switching ? (
          <Spinner className="size-3.5 text-ink-faint" />
        ) : (
          <CaretUpDown className="size-3.5 text-ink-faint" />
        )}
      </AriaButton>
      <MenuPopover placement="bottom start" className="w-64">
        <p className="label-mono px-2.5 pt-2 pb-1">Workspaces</p>
        <Menu onAction={key => onSwitch(String(key))}>
          {orgs.map(o => (
            <MenuItem key={o.org_id} id={o.org_id} textValue={o.name}>
              <Avatar
                name={o.name}
                shape="square"
                className="size-6 text-[10px]"
              />
              <span className="min-w-0 flex-1 truncate">{o.name}</span>
              {o.org_id === org.org_id && (
                <Check className="size-3.5 text-accent" />
              )}
            </MenuItem>
          ))}
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  );
}

function UserMenu() {
  const { user } = useActiveOrg();
  const { logout } = useAuth();
  const name = user.fullname || user.username || user.email || 'Account';

  return (
    <MenuTrigger>
      <AriaButton
        aria-label="Account menu"
        className="rounded-full outline-none data-focus-visible:ring-2 data-focus-visible:ring-accent data-focus-visible:ring-offset-2 data-focus-visible:ring-offset-canvas"
      >
        <Avatar name={name} src={user.profile_img} className="size-7" />
      </AriaButton>
      <MenuPopover placement="bottom end">
        <div className="px-2.5 py-2">
          <p className="truncate text-[13px] font-medium">{name}</p>
          {user.email && (
            <p className="truncate text-xs text-ink-muted">{user.email}</p>
          )}
        </div>
        <MenuSeparator />
        <Menu onAction={key => key === 'logout' && logout()}>
          <MenuItem id="logout" className="text-danger">
            <SignOut className="size-4" />
            Sign out
          </MenuItem>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  );
}

export function AppShell() {
  return (
    <div className="flex h-full">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-surface md:flex">
        <div className="flex h-14 items-center px-2.5">
          <WorkspaceSwitcher />
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-2.5 pt-2">
          <p className="label-mono px-2 pb-1.5">Workspace</p>
          {NAV.map(({ label, to, icon: NavIcon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                cn(
                  'flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] font-medium transition-colors',
                  isActive
                    ? 'bg-accent-soft text-accent'
                    : 'text-ink-muted hover:bg-subtle hover:text-ink'
                )
              }
            >
              <NavIcon className="size-4" weight="duotone" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 border-t border-line px-4 py-3 text-ink-faint">
          <LogoMark className="size-6 rounded-md text-[8px]" />
          <span className="text-xs">Code A2Z · v{appVersion}</span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-canvas/80 px-4 backdrop-blur sm:px-6">
          <div className="md:hidden">
            <WorkspaceSwitcher />
          </div>
          <div className="hidden h-8 max-w-sm flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-[13px] text-ink-faint sm:flex">
            <MagnifyingGlass className="size-4" />
            <span className="flex-1">Search…</span>
            <kbd className="rounded border border-line px-1 font-mono text-[10px]">
              ⌘K
            </kbd>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <ThemeToggle />
            <UserMenu />
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
