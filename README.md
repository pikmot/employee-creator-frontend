# Employee Creator Frontend

A React + TypeScript frontend for managing employees: browse, search, paginate, view details, create, edit and delete, backed by a Spring Boot REST API.

```
employee-creator-frontend/
├── src/
│   ├── components/
│   │   ├── Dropdown/            # Page size selector
│   │   ├── EmployeeCardRow/     # List-view employee card
│   │   ├── EmployeeCardBlock/   # Grid-view employee card
│   │   ├── Modal/               # Employee detail dialog
│   │   ├── PageCounter/         # Previous / next page controls
│   │   ├── SearchBar/           # Name search input
│   │   ├── Spinner/             # Loading indicator
│   │   └── Error/               # Error indicator
│   ├── pages/
│   │   ├── Home/                # Employee list
│   │   └── Form/                # Create / edit form + Zod schema
│   ├── services/                # API calls (LoadData.ts)
│   ├── scss/                    # Normalize, colors (light + dark), fonts, media, mixins
│   └── Employee.ts              # Shared TypeScript types
├── .env                         # Backend URL config
├── index.html
├── package.json
└── tsconfig.json
```

## Demo & Snippets

<!-- add screenshots / GIF of the list (row + grid views), search, the detail modal and the form -->

## Requirements / Purpose

### MVP

- Display a list of employees on the home page
- Create new employees through a form
- Edit existing employee details
- Delete employees from the list
- Form fields include personal info, contact details, contract type, employment status, dates and hours

### Stretch goals completed

- Server-side pagination with selectable page size
- Search by employee name
- Toggle between row and grid layouts
- Loading and error states
- Employee detail modal

### Purpose of project

Second Full Stack project using React and Spring Boot. Focused on a form-heavy CRUD application: schema-validated forms, server-state management with a query cache, pagination and search against a REST API, and a relational database behind it.

### Tech Stack

- **Frontend:** React 19, TypeScript, Vite, SCSS
- **Routing:** React Router
- **Forms & validation:** React Hook Form + Zod (`@hookform/resolvers`)
- **Server state:** TanStack React Query
- **Modal:** native HTML `<dialog>` element
- **Styling:** SCSS modules, shared mixins and colour variables, Google Fonts (Playfair Display, Poppins, Lato)

## Build Steps

```bash
npm install
npm run dev
```

Requires a `.env` file:

```bash
VITE_BACKEND_URL=http://localhost:8080
```

The backend must be running (see the backend repo). It allows requests from `localhost:5173`.

## Design Goals / Approach

- **Single Form for Create and Edit** - one `Form` component decides its mode from the `:id` route param and uses `reset()` to pre-fill fields when editing.
- **Schema-driven validation** - one Zod schema (`schema.ts`) defines the form's shape and rules; React Hook Form's `register` keeps inputs uncontrolled so typing doesn't re-render the form.
- **React Query for server state** - `useQuery` fetches the employee page, keyed on `["employees", page, pageSize, searchTerm]`, so changing any filter refetches automatically. `useMutation` handles create, update and delete, then invalidates the `"employees"` key to refresh the list.
- **State lives where it's used** - page, page size, search term, view mode and the selected employee are `useState` in `Home` and passed down as setters or callbacks; cards receive `onDelete` and `onModalClick` callbacks and never call the API themselves.
- **Native `<dialog>` for the modal** - opened with `showModal()`, so the browser provides the top layer, the `::backdrop`, focus trapping and an inert page behind it, with no overlay or z-index code.
- **Frosted-glass styling** - translucent surfaces with `backdrop-filter` blur, a faint light border and a soft shadow, carried over from my todo app.

## Features

- Create, read, update and delete employees
- Row and grid views of the employee list
- Server-side pagination with a page counter and page-size dropdown
- Search by name (resets to page 1 when the term changes)
- Click a card to open a detail modal with the full employee record
- Radio buttons for contract type / employment status with sensible defaults
- "On going" checkbox that disables the finish date field
- Zod validation with inline field errors
- Spinner while loading, error component on failure

## Known issues

- `fetchAllEmployee`, `fetchEmployeeById` and `patchEmployee` don't check `response.ok`, so backend errors (e.g. an out-of-range page) don't reach React Query's `isError`
- Dark mode is not finished: the dark colour variables exist in `_colors.scss`, but the theme context and toggle button are still empty files and no component applies them yet
- The modal builds the name as `firstName + middleName + lastName`, so there are no spaces, and a missing middle name shows as "undefined"
- Pressing Escape closes the dialog without clearing the selected employee in `Home`, so re-clicking the same card may not reopen it
- The page-size dropdown offers 30, but the backend caps page size at 20
- Search fires on every keystroke (no debounce) and the term isn't URL-encoded
- Deleting the last item on the last page can leave the current page out of range
- Edit mode still loads the employee with a manual `useEffect` instead of `useQuery`
- Leftover dead code in `Form.tsx` (old controlled-state handlers, commented inputs) and duplicate error text on the radio groups
- Project metadata still reads `album-map` (package name, page title)

## Future Goals

- Finish light/dark mode (theme context, toggle, apply the dark variables)
- Fix response-status handling in the API layer so `isError` is accurate
- Close the modal reliably (Escape and backdrop click) and fix the name formatting
- Debounce search and encode the search term
- Load edit-mode data with React Query
- Pinned / favourite employees
- Component tests and Playwright end-to-end tests
- Responsive layout pass using the media-query mixins

## Change logs

### 22/08/2026 - Initial Setup

- Created frontend with React, TypeScript, Vite and SCSS

### 23/08/2026 - Homepage, Form and CRUD

- Employee cards and homepage styling; delete wired to the backend
- Form template with controlled inputs; create (POST) and edit (PATCH) wired up

### 25/08/2026 - Fixes

- Fixed `onGoing` naming bug, removed redundant state, moved background colour into SCSS

### 30/08/2026 - 03/09/2026 - React Hook Form + Zod

- Added Zod schema and refactored every field to React Hook Form
- Default values for radio groups; finish date disabled while "on going" is checked
- Single form handles create vs edit and pre-fills via `reset()`

### 09/09/2026 - 16/09/2026 - Layout and styling

- Dividers between cards, row/grid toggle, user icon on cards
- Playfair / Poppins / Lato typography, two-column form

### 19/09/2026 - 27/09/2026 - Pagination, search, UX

- Paginated fetching, page counter, page-size dropdown
- Search bar with page reset; spinner and error states

### 30/09/2026 - React Query

- Replaced manual fetch/`useEffect` with `useQuery`; create, update and delete via `useMutation`
- Typed mutation data and made optional fields optional

### 06/10/2026 - 08/10/2026 - Detail modal

- Added modal component, opened from a card click and closed from the X button
- Switched the modal from a `<div>` overlay to a native `<dialog>`, which fixed the layering bugs
- Frosted-glass styling from the todo app; fixed the finish date shown for "on going" employees

### 11/10/2026 - Dark mode colours

- Added the dark colour palette as SCSS variables (theme wiring still to do)

## What did you struggle with?

## What did you struggle with?

- **Async calls.** Forgetting `await` on delete caused "so many bugs", and create and edit were buggy at first.
- **Matching field names with the backend.** The `onGoing` naming mismatch lost data until I fixed it on both sides.
- **React Hook Form and Zod.** Moving the form over took several commits to get schema names, defaults and the finish date behavior right.
- **Pagination state.** The page number had to reset when search or page size changed, which caused three separate bugs.
- **TypeScript with React Query.** I had to fix typing errors and make optional fields optional after switching to `useQuery` and `useMutation`.
- **The modal.** A plain `<div>` overlay had "LOTS of bugs", and switching to a native `<dialog>` fixed them.
