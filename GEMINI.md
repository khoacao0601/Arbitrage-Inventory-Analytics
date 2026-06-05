# Agent Long-Term Memory (GEMINI.md)

This document serves as a long-term memory for the AI to remember rules, project context, encountered issues, and their resolutions throughout the development process.

## Project Context
- **Framework:** Angular
- **Structure:** Standalone Components
- **UI Library:** PrimeNG 18+ (Using modern Styled Mode with CSS Variables/Design Tokens instead of legacy SASS).
- **Layout Architecture:** The `MainComponent` is the root layout wrapper used for routing (`/`). It contains `<app-side-bar>` (left sidebar) and `<app-header>` (top navbar). We use a "Dashboard Card" layout where the main content sits in a floating, distinct card (lighter background, rounded corners) visually separated from the darker app shell (Sidebar + Header).

## Best Practices & Guidelines
- **English Only:** All code, including variable names, class names, and comments, MUST be written in English. This is a community app. Chat communication can remain in Vietnamese.
- **No Inline Styles:** Never use `style="..."` in HTML templates. Always extract styles to SCSS files.
- **Minimize Raw SCSS:** Leverage PrimeNG's built-in features, design tokens, and APIs (e.g., `styleClass` for components) instead of writing custom CSS hacks or excessive raw SCSS.
- **No `::ng-deep` for State Mocks:** Never use `::ng-deep` with pseudo-selectors (like `:nth-child`) to fake active/hover states. Use Angular's `routerLinkActive` or PrimeNG properties.
- **Replacing `::ng-deep` completely:** When custom inner styling of a child component is absolutely necessary and cannot be achieved via PrimeNG CSS tokens, use `ViewEncapsulation.None` on the parent component and wrap the CSS in the parent's tag (e.g., `app-side-bar { ... }`) to prevent global leakage instead of using `::ng-deep`.
- **Routing:** Always use `<router-outlet>` for page navigation instead of hardcoding component tags directly into `app.component.html`.
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

---
*Note: The AI will continuously update this file whenever there are new learnings or configurations in the future.*
