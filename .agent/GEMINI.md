# Agent Long-Term Memory (GEMINI.md)

This document serves as a long-term memory for the AI to remember rules, project context, encountered issues, and their resolutions throughout the development process.

## Project Context
- **Framework:** Angular
- **Structure:** Standalone Components

## Best Practices & Guidelines
- Always use `<router-outlet>` for page navigation (Routing) instead of hardcoding component tags directly into `app.component.html`.
- Keep components independent, compact, and easily reusable.

## Known Issues & Resolutions
1. **Component Duplication due to Static Declaration**
   - **Description:** Declaring `<app-warning>` and `<app-click-count>` tags directly below `<router-outlet>` in `app.component.html` caused these components to be statically displayed on all pages, leading to duplicate UI elements when navigating to their respective routes.
   - **Resolution:** Removed the static tags from the HTML and configured them as dynamic routes via the `routes` array in `app.routes.ts`.

---
*Note: The AI will continuously update this file whenever there are new learnings or configurations in the future.*
