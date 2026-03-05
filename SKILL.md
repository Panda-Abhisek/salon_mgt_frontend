---
name: salon_mgt_frontend
description: Skill for working on the Salon Management React frontend, guided by bundled frontend design and best‑practice skills.
---

## salon_mgt_frontend

Instructions for how the agent should work when editing or extending this Salon Management frontend app.

### When to use

Use this skill whenever the task involves:

- **Frontend code**: Creating or modifying React components, pages, layouts, navigation, or hooks.
- **UI/UX and styling**: Changing visual design, spacing, typography, colors, or responsive behavior.
- **App flows**: Updating dashboards, auth flows, or any salon‑specific workflows in the browser.
- **Frontend architecture**: Refactoring UI structure, extracting shared components, or improving state management on the client.

### Linked skills from `skills-lock.json`

The following skills are already bundled via `skills-lock.json`. When this skill is active, the agent should implicitly follow them:

- **`frontend-design` (`anthropics/skills`)**: Apply modern, clean layout and component design appropriate for a production web app.
- **`remotion-best-practices` (`remotion-dev/skills`)**: Only if working with Remotion video/animation code, follow Remotion conventions and performance best practices.
- **`vercel-react-best-practices` (`vercel-labs/agent-skills`)**: Use idiomatic React patterns, hooks, and component structure; keep components small, focused, and composable.
- **`web-design-guidelines` (`vercel-labs/agent-skills`)**: Maintain good typography, color contrast, spacing, and overall visual hierarchy suitable for a salon management product.

### Instructions

1. **Understand the feature and context**
   - Identify which part of the salon app you are touching (e.g. super admin dashboard, staff views, appointments, audits).
   - Skim nearby files (layouts, shared components, hooks, config) and reuse existing patterns, naming, and structure.

2. **Apply bundled frontend best practices**
   - Follow `frontend-design` and `web-design-guidelines` for layout, spacing, typography, and responsive behavior.
   - Follow `vercel-react-best-practices` for React code: prefer functional components and hooks, keep components focused, and avoid unnecessary re-renders.
   - If touching any Remotion-related code, also follow `remotion-best-practices` for composition, performance, and file organization.

3. **Keep the UI consistent with the existing app**
   - Reuse existing design tokens, colors, and component patterns instead of inventing new ones.
   - Ensure new screens and components fit naturally into current navigation and layout (e.g. sidebars, headers, cards, tables).

4. **Prioritize clarity, accessibility, and performance**
   - Use clear labels and copy, avoid ambiguous actions, and keep flows simple for salon staff and admins.
   - Maintain reasonable color contrast and keyboard accessibility where practical.
   - Avoid unnecessary network calls or re-renders; memoize or split components when they become heavy.

5. **Validate changes**
   - Ensure there are no obvious console errors or React warnings.
   - Keep the codebase lint‑clean for edited files and run or update lightweight tests where they exist.
