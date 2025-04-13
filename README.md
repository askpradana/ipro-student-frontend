# IPRO Student

A modern, high-performance Vue 3 frontend application built with TypeScript, Vite, and Bun. This project follows best practices for Vue 3 development and provides a robust foundation for building scalable web applications.

## 🚀 Key Features

- **Modern Tech Stack**

  - Vue 3 with Composition API and `<script setup>`
  - TypeScript for enhanced type safety and developer experience
  - Vite for lightning-fast development and optimized builds
  - Bun as the JavaScript runtime and package manager
  - Tailwind CSS for utility-first styling
  - ESLint and Prettier for code quality and formatting

- **Developer Experience**

  - Hot Module Replacement (HMR)
  - TypeScript integration with Vue components
  - Automatic imports and component registration
  - Built-in code formatting and linting
  - Comprehensive error reporting

- **Performance Optimizations**
  - Code splitting and lazy loading
  - Optimized asset handling
  - Efficient bundling with Vite
  - Tree-shaking for unused code elimination

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [VSCode](https://code.visualstudio.com/) (recommended)

## 📦 Development Environment Setup

### IDE Configuration

1. Install [VSCode](https://code.visualstudio.com/)
2. Install recommended extensions:
   - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
   - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
   - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Project Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ipro-fe
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📝 Available Scripts

```bash
# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Lint files
bun lint

# Type check
bun run type-check

# Format code
bun run format
```

## 🏗️ Project Structure

```
ipro-fe/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, and other static assets
│   │   ├── common/     # Shared components
│   │   └── layout/     # Layout components
│   ├── components/     # Reusable Vue components
│   ├── composables/    # Composition API utilities
│   ├── views/          # Page components
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.vue         # Root component
│   └── main.ts         # Application entry point
├── .env                # Environment variables
├── .eslintrc.js       # ESLint configuration
├── .prettierrc        # Prettier configuration
├── index.html         # HTML entry point
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
VITE_APP_TITLE=IPRO Student
```

### TypeScript Configuration

The project uses `tsconfig.json` for TypeScript configuration. Key features include:

- Strict type checking
- Path aliases for cleaner imports
- Vue 3 type support
- Modern JavaScript features

### Vite Configuration

The `vite.config.ts` file includes:

- Vue 3 plugin configuration
- Path aliases
- Build optimization settings
- Development server configuration

## 📚 Development Guidelines

### Vue Component Structure

- Use `<script setup>` syntax
- Define props and emits with TypeScript interfaces
- Keep components focused and single-responsibility
- Use composition API for complex logic
- Extract reusable logic into composables

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first design principles
- Maintain consistent spacing and typography
- Use CSS variables for theme values
- Implement responsive design patterns

### Code Quality

- Follow ESLint rules
- Use Prettier for code formatting
- Write meaningful commit messages
- Document complex logic
- Write unit tests for critical functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT License](LICENSE)

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
