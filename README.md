# ipro-student

A modern Vue 3 frontend application built with TypeScript, Vite, and Bun.

## 🚀 Features

- Vue 3 with Composition API and `<script setup>`
- TypeScript for enhanced type safety
- Vite for lightning-fast development
- Bun as the JavaScript runtime and package manager
- Tailwind CSS for utility-first styling
- ESLint for code quality

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [VSCode](https://code.visualstudio.com/) (recommended)

## 📦 IDE Setup

1. Install [VSCode](https://code.visualstudio.com/)
2. Install recommended extensions:
   - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
   - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
   - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 🚀 Getting Started

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

# Lint files
bun lint

# Type check
bun run type-check
```

## 🏗️ Project Structure

```
ipro-fe/
├── public/          # Static assets
│   ├── assets/      # Dynamic assets
│   ├── components/  # Vue components
│   ├── composables/ # Composition API utilities
│   ├── views/       # Page components
│   ├── App.vue      # Root component
│   └── main.ts      # Application entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Configuration

- TypeScript configuration: `tsconfig.json`
- Vite configuration: `vite.config.ts`
- ESLint configuration: `.eslintrc.js`
- Environment variables: `.env`

## 📚 Type Support

TypeScript cannot handle type information for `.vue` imports by default. The project uses `vue-tsc` for type checking. [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) is required for proper TypeScript support in `.vue` files.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

[MIT License](LICENSE)
