# Agent Long-Term Memory (GEMINI.md)

This document serves as a long-term memory for the AI to remember rules, project context, encountered issues, and their resolutions throughout the development process.

## Project Context
- **Architecture:** Monorepo containing decoupled Frontend and Backend (using `concurrently` at root for orchestration).
- **Frontend Framework:** Angular SSR (located in `frontEnd/`)
- **Backend Framework:** Node.js Express API (located in `backend/`)
- **Frontend Structure:** Standalone Components
- **UI Library:** PrimeNG 18+ (Using modern Styled Mode with CSS Variables/Design Tokens instead of legacy SASS).
- **Layout Architecture:** The `MainComponent` is the root layout wrapper used for routing (`/`). It contains `<app-side-bar>` (left sidebar) and `<app-header>` (top navbar). We use a "Dashboard Card" layout where the main content sits in a floating, distinct card (lighter background, rounded corners) visually separated from the darker app shell (Sidebar + Header).

## Best Practices & Guidelines
- **English Only:** All code, including variable names, class names, and comments, MUST be written in English. This is a community app. Chat communication can remain in Vietnamese.
- **No Inline Styles:** Never use `style="..."` in HTML templates. Always extract styles to SCSS files.
- **Minimize Raw SCSS:** Leverage PrimeNG's built-in features, design tokens, and APIs (e.g., `styleClass` for components) instead of writing custom CSS hacks or excessive raw SCSS.
- **No `::ng-deep` for State Mocks:** Never use `::ng-deep` with pseudo-selectors (like `:nth-child`) to fake active/hover states. Use Angular's `routerLinkActive` or PrimeNG properties.
- **Replacing `::ng-deep` completely:** When custom inner styling of a child component is absolutely necessary and cannot be achieved via PrimeNG CSS tokens, use `ViewEncapsulation.None` on the parent component and wrap the CSS in the parent's tag (e.g., `app-side-bar { ... }`) to prevent global leakage instead of using `::ng-deep`.
- **Routing & Layout:** Always use `<router-outlet>` for page navigation instead of hardcoding component tags. For a persistent App Shell (like Sidebar and Header), the `MainComponent` should serve as the layout wrapper and use a nested `<router-outlet>` to render child pages (like Table or Dashboard).
- **Component Design:** Keep components independent, compact, and easily reusable.
- **PrimeNG Styling:** Override component CSS variables on the `:host` level instead of using global overrides. Example: `:host { --p-panel-header-background: var(--p-primary-color); }`.
- **PrimeNG Menubar Customization:** To align items to the right side of the `<p-menubar>`, always place them inside the `<ng-template #end>` slot (e.g., Profile Icons, Login/Logout actions).

## Known Issues & Resolutions
1. **Component Duplication due to Static Declaration**
   - **Description:** Declaring `<app-warning>` and `<app-click-count>` tags directly below `<router-outlet>` in `app.component.html` caused these components to be statically displayed on all pages, leading to duplicate UI elements when navigating to their respective routes.
   - **Resolution:** Removed the static tags from the HTML and configured them as dynamic routes via the `routes` array in `app.routes.ts`.
2. **Missing UI Elements from Libraries**
   - **Description:** UI elements from UI libraries won't display if their module isn't included in the `@Component.imports` array.
   - **Resolution:** Always ensure to import the specific Module (e.g., `MenubarModule`) inside the `.ts` file of the component using it.
3. **PrimeIcons Not Displaying (Blank Icons)**
   - **Description:** Icons (like `pi pi-user`) in PrimeNG components completely disappeared or rendered as blank spaces.
   - **Resolution:** Ensured `primeicons` was installed via npm (`npm install primeicons`) and imported into the global `styles.scss` file using `@import "primeicons/primeicons.css";`.
4. **Jest/Jasmine Types & VSCode TS Server Sync**
   - **Description:** Even after installing `@types/jest`, VSCode might still report errors like `Cannot find name 'describe'` in test files.
   - **Resolution:** 
     1. Always ensure `"jest"` is explicitly added to the `"types"` array inside `tsconfig.spec.json` alongside or replacing `"jasmine"`.
     2. Ensure the test file ends with `.spec.ts` to be picked up by the Angular test builder configuration (`"include": ["src/**/*.spec.ts"]`).
     3. Restart the VSCode TypeScript Server (`Ctrl + Shift + P` -> `TypeScript: Restart TS Server`) so the editor instantly recognizes the updated configuration.
5. **SonarQube Express Security Warning (typescript:S5689)**
   - **Description:** SonarQube flags `const app = express();` with "This framework implicitly discloses version information by default". By default, Express sends the `X-Powered-By: Express` HTTP header, which exposes the technology stack to potential attackers.
   - **Resolution:** Added `app.disable('x-powered-by');` immediately after initializing the Express app in `server.ts` to hide this header and improve security.

6. **Mixing CommonJS and ES Modules in TypeScript**
   - **Description:** Using `require()` or `exports =` in a TypeScript project configured for ES Modules leads to undefined exports, runtime errors like `pool.query is not a function`, and `TypeError: argument handler must be a function`.
   - **Resolution:** Uniformly use modern ES6 syntax (`import { module } from 'path'` and `export const ...`) across all `.ts` files. Set `"verbatimModuleSyntax": false` in `tsconfig.json` if maintaining CommonJS output in `package.json`.
7. **PostgreSQL Default Values (UUID and Timestamps)**
   - **Description:** When inserting data without explicitly passing values for `id`, `created_at`, or `updated_at`, PostgreSQL will throw a `violates not-null constraint` error or insert `[null]` if default values aren't configured on the table schema.
   - **Resolution:** Always ensure to set Default values via UI or SQL (`ALTER TABLE ... SET DEFAULT gen_random_uuid();` and `SET DEFAULT CURRENT_TIMESTAMP;`) for auto-generated columns.

---
*Note: The AI will continuously update this file whenever there are new learnings or configurations in the future.*
