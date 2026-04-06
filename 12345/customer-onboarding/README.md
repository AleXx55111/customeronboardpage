# Customer Onboarding Portal

An Angular 16 application replicating the Customer Onboarding UI with a white sidebar.

---

## 📁 Project Structure

```
customer-onboarding/
├── angular.json                          ← Angular CLI config
├── package.json                          ← Dependencies
├── tsconfig.json                         ← TypeScript config
├── tsconfig.app.json
├── README.md
└── src/
    ├── index.html                        ← Root HTML
    ├── main.ts                           ← Bootstrap entry
    ├── assets/
    │   └── styles/
    │       ├── variables.css             ← CSS design tokens
    │       └── global.css               ← Reset & base styles
    └── app/
        ├── app.component.ts             ← Root component
        ├── app.component.html
        ├── app.component.css
        ├── app.module.ts                ← Module declarations
        ├── models/
        │   └── customer.model.ts        ← Interfaces: Customer, NavGroup, NavItem
        ├── services/
        │   └── customer.service.ts      ← CRUD, search, sort, formatting
        └── components/
            ├── sidebar/                 ← White sidebar with collapsible nav
            │   ├── sidebar.component.ts
            │   ├── sidebar.component.html
            │   └── sidebar.component.css
            ├── topbar/                  ← Top navigation bar + search
            │   ├── topbar.component.ts
            │   ├── topbar.component.html
            │   └── topbar.component.css
            ├── customer-table/          ← Main data table with sort/filter
            │   ├── customer-table.component.ts
            │   ├── customer-table.component.html
            │   └── customer-table.component.css
            └── add-customer-modal/      ← Add / Edit customer modal
                ├── add-customer-modal.component.ts
                ├── add-customer-modal.component.html
                └── add-customer-modal.component.css
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- Angular CLI 16

```bash
npm install -g @angular/cli@16
```

### Install & Run

```bash
cd customer-onboarding
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200)

### Build for Production

```bash
ng build
```

Output goes to `dist/customer-onboarding/`.

---

## 🎨 Design

| Element            | Color       |
|--------------------|-------------|
| Sidebar background | `#ffffff`   |
| Sidebar active     | `#e6f3f8`   |
| Active accent      | `#3d8fa8`   |
| Logout button      | `#3d8fa8`   |
| Employee links     | `#4a90b8`   |
| Table header bg    | `#f5f5f5`   |
| Page background    | `#f2f2f2`   |

---

## ✨ Features

- ✅ White collapsible sidebar with teal accent
- ✅ Customer table with sort on all columns
- ✅ Search by name or Account ID
- ✅ Editable date inputs per row
- ✅ Add / Edit / Delete customers
- ✅ Reactive state via `BehaviorSubject` in `CustomerService`
- ✅ Toast notifications
- ✅ Decorative SVG wave background (matches original screenshot)
