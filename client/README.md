# Code A2Z — Client

### Stack

| Concern    | Choice                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) with semantic tokens in `src/styles/index.css`                   |
| Primitives | [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) (accessible, unstyled) |
| Icons      | [Phosphor](https://phosphoricons.com) (`@phosphor-icons/react`)                                             |
| Fonts      | Geist / Geist Mono                                                                                          |
| HTTP       | axios instance in `src/infra/rest/index.ts`                                                                 |
| Routing    | react-router v7                                                                                             |

Use the semantic color tokens (`bg-canvas`, `bg-surface`, `text-ink`, `text-ink-muted`, `border-line`, `bg-accent`, …) and never raw palette colors. Dark mode then works without extra code.

### Getting started

```bash
cp .env.example .env   # VITE_SERVER_DOMAIN=http://localhost:8000
npm install
npm run dev
```

Start the server too (`cd ../server && npm run dev`).

Access is **invite-only**; there is no public signup. To get a first account locally:

```bash
cd ../server
npm run seed:dev          # creates org "Default" + owner dev@localhost / DevAdmin123
```

Sign in with that account. New organizations go through `/request-org`, then a platform admin approves them (`npm run approve-request -- --email=<requester>`; the CLI prints the `/set-password` link). Members join through invites (`npm run list-invite-links` prints the `/accept-invite` links).

### Layout

```
src/
  app/            routes + app shell (sidebar, workspace switcher, user menu)
  modules/
    auth/         login, request-org, accept-invite, set-password, select-org
    home/         Overview page
  infra/rest/     axios client + API modules (one folder per server resource)
  shared/
    auth/         AuthProvider, useAuth, in-memory token store
    ui/           Button, TextField, Menu, Avatar, Logo, Spinner, ThemeToggle
    utils/
  styles/         Tailwind entry + design tokens
```

### Auth flow

1. `POST /api/auth/login`, `/accept-invite` or `/set-password-after-approval` returns a **pre-org** access token and sets the `refresh_token` httpOnly cookie.
2. `POST /api/auth/select-org` exchanges the pre-org token for an **org-scoped** token. This step is automatic when the user has one org or a remembered org. Otherwise the user sees the workspace picker.
3. On reload, the app calls `refresh`, then `GET /api/auth/session` (user + orgs), then `select-org` for the last org.
4. When any API call returns 401, the axios interceptor refreshes the token, re-selects the org, and retries the call once.

The access token lives **in memory only**. `localStorage` holds just `selected_org_id` and `theme`.

`App.tsx` derives routing from `useAuth().state.status` (`loading | signed-out | needs-org | ready`), so guards can't drift out of sync.

### Adding a page

1. Create `src/modules/<feature>/<feature>-page.tsx`.
2. Add a route under `<AppShell />` in `src/App.tsx`.
3. Add a nav entry to `NAV` in `src/app/app-shell.tsx`.
4. Read the current org/user with `useActiveOrg()`.
