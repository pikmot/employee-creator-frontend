# Employee Creator Frontend

A React frontend for managing employees with full CRUD functionality.

```
employee-creator-frontend/
├── src/
│   ├── components/         # UI components (EmployeeCard, EmployeeForm)
│   ├── pages/              # Home and Form pages
│   ├── services/           # API calls (LoadData)
│   └── scss/               # Shared styles, variables, mixins
│
├── .env                    # Backend URL config
├── index.html
├── package.json
└── tsconfig.json
```

## Demo & Snippets

## Requirements / Purpose

### MVP

- Display a list of employees on the home page
- Create new employees through a form
- Edit existing employee details
- Delete employees from the list
- Form fields include personal info, contact details, contract type, employment status, dates and hours

### Purpose of project

Second Full Stack project using React and Spring Boot. Focused on building a form heavy CRUD application with controlled inputs, radio buttons, checkboxes and connecting to a REST API with a relational database.

### Tech Stack

- **Frontend:** React, TypeScript, Vite, SCSS
- **Routing:** React Router

## Build Steps

```bash
npm install
npm run dev
```

Requires a .env file

```bash
VITE_BACKEND_URL=http://localhost:8080
```

## Design Goals / Approach

- **Single Form for Create and Edit** - The same Form component handles both creating and editing an employee. It checks for an ID in the URL to determine which mode it is in.
- **Single State Object** - All form fields are managed through one useState object instead of individual useState calls for each field. A single handleChange function updates the correct field using computed property keys.
- **Controlled Inputs** - Every input has its value tied to state so React is always the source of truth for what is displayed.

## Features

- Create, read, update and delete employees
- Single form component that handles both create and edit
- Radio buttons for contract type and employment status
- Checkbox for ongoing employment that disables the finish date field
- Input validation with required fields
- Responsive layout

## Known issues

- Styling needed
- Missing fileds and buggy null/undefined values

## Future Goals

- Refactor form to use React Hook Form and Zod validation
- Add better error handling for API failures
- Add loading states
- Improve styling and responsiveness

## Change logs

### 22/08/2026 - Initial Setup

- Created frontend project with React, TypeScript, Vite and SCSS

### 23/08/2026 - Homepage and Employee Cards

- Added basic styling for the homepage and employee cards
- Wired up delete to update the backend and re-render the frontend

### 23/08/2026 - Form and CRUD

- Added form template for creating employees
- Added onChange handling for each form field using a single state object
- Set default values for radio buttons on create
- Wired up create employee to send POST request to backend
- Added required field validation on the form
- Wired up PATCH for editing existing employees

## What did you struggle with?

-
