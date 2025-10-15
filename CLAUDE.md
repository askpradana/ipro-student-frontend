# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
bun dev

# Build for production
bun run build

# Type checking
bun run type-check

# Linting and formatting
bun lint
bun run format

# Preview production build
bun run preview
```

## Project Architecture

This is a Vue 3 TypeScript application built with Vite and uses Bun as package manager. The project follows a role-based architecture with three user types: USER, ADMIN, and VIEWER.

### Core Technologies
- Vue 3 with Composition API and `<script setup>`
- TypeScript for type safety
- Pinia for state management
- Vue Router with role-based guards
- Tailwind CSS for styling
- Chart.js for data visualization
- jsPDF for PDF exports

### Authentication & Roles
The application uses token-based authentication with three distinct roles:
- **USER**: Students who take quizzes and view results
- **ADMIN**: Administrators who manage users and view analytics
- **VIEWER**: Limited access users who can view calculations and charts

Authentication state is managed in `src/stores/auth.ts` and persisted in localStorage.

### Routing Structure
Routes are protected by authentication guards in `src/router/index.ts`:
- Public routes: `/`, `/about`, `/login`
- USER routes: `/dashboard`, `/quiz`, `/agreement`, `/results`, `/completed`
- ADMIN routes: `/admin/dashboard`, `/admin/add-users`, `/admin/add-students`
- VIEWER routes: `/viewer/dashboard`, `/user/calculate/:userId`
- Shared routes: `/chart` (ADMIN + VIEWER)

### State Management (Pinia Stores)
- `auth.ts`: User authentication and role management
- `quizStore.ts`: Quiz state and question management
- `timerStore.ts`: Quiz timer functionality
- `modalStore.ts`: Modal dialog state
- `admin.ts`: Admin-specific operations
- `userStores.ts`: User data management
- `exerciseStore.ts`: Exercise/training state

### Quiz System
The application includes a comprehensive quiz system with:
- Multiple quiz types (numbered 1-6) mapped to different assessments
- Training mode with local JSON data for practice
- Production mode with API integration
- Timer functionality for timed assessments
- Progress tracking and violation detection

Quiz data structure follows `APIResponse` type from `src/types/quizTypes.ts`.

### Key Components Structure
- `src/components/QuizForms/`: Quiz-specific form components
- `src/components/modals/`: Reusable modal dialogs
- `src/components/tables/`: Data table components
- `src/components/exports/`: PDF export functionality
- `src/components/shared/`: Reusable UI components

### API Layer
API calls are centralized in `src/api/` directory with composables pattern:
- Authentication interceptor in `src/utils/apiInterceptor.ts`
- Composable-based API hooks (e.g., `useGetQuiz.ts`)
- Environment-based base URL configuration

### Code Conventions (from .cursorrules)
- Always use `<script setup>` with TypeScript
- Use Tailwind CSS utility classes exclusively
- Extract reusable logic into composables
- Define props and emits with TypeScript interfaces
- Import order: Vue imports, composables, then components
- Use ref() for primitives, reactive() for complex objects

### Environment Configuration
Uses Vite environment variables:
- `VITE_BASE_URL`: API base URL
- `VITE_APP_TITLE`: Application title

The application includes comprehensive PDF export functionality, chart visualizations, and a robust user management system.