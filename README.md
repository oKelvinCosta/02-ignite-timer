# Ignite Timer

A Pomodoro-style timer application built with React and TypeScript as part of Rocketseat's Ignite program.

## 🚀 Technologies & Concepts

This project was developed with the following technologies and concepts:

### Core Technologies

- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS styling solution

### State Management

- **Context API** - For global state management
- **useReducer** - For complex state logic
- **Immer** - For working with immutable state in a more convenient way

### Form Handling

- **React Hook Form** - For form state management and validation
- **Zod** - Schema validation with TypeScript integration

### UI/UX

- **Phosphor Icons** - Beautiful and consistent icon set
- **Styled Components Theming** - For consistent theming across the application
- **Responsive Design** - Works on different screen sizes

### Development Tools

- **ESLint** - Code linting with Rocketseat's configuration
- **TypeScript** - Static type checking
- **Vite** - Fast development server and build tool

## 📂 Project Structure

```
src/
├── @types/              # TypeScript type definitions
├── assets/              # Static assets like images and fonts
├── components/          # Reusable UI components
├── contexts/            # React contexts for state management
├── layouts/             # Layout components
├── pages/               # Application pages
│   ├── Home/           # Home page with timer functionality
│   └── History/        # History page to track completed cycles
├── reducers/            # Reducer functions for useReducer
│   └── cycles/         # Cycle-related reducers and actions
└── styles/              # Global styles and theme configuration
```

## 🛠️ Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📝 Features

- Start, interrupt, and complete pomodoro cycles
- Track time spent on tasks
- View history of completed cycles
- Form validation with error handling
- Responsive design

## 📚 What I Learned

This project helped me understand and practice:

- React Hooks (useState, useEffect, useReducer, useContext)
- TypeScript with React components and hooks
- State management patterns with Context API and useReducer
- Form handling and validation with React Hook Form and Zod
- Styling with Styled Components and theming
- Clean code organization and project structure
- Date manipulation with date-fns
- Immutable state updates with Immer

## 📄 License

This project is part of Rocketseat's Ignite program and is available under the MIT license.

---

Made with 💜 by Kelvin Costa 👋
