# Todo App

A beautiful and modern todo application built with Next.js, React, and Tailwind CSS. This app helps you organize your tasks and stay productive with a clean, intuitive interface.

## Features

- ✨ **Modern UI**: Beautiful gradient background and smooth animations
- 🌙 **Dark Mode Support**: Automatically adapts to your system preferences
- 📝 **Add Todos**: Quickly add new tasks to your list
- ✅ **Mark Complete**: Toggle todos as completed with checkboxes
- 🗑️ **Delete Todos**: Remove tasks you no longer need
- 🔍 **Filter Todos**: View all, active, or completed todos
- 🧹 **Clear Completed**: Remove all completed todos at once
- 💾 **Local Storage**: Your todos are automatically saved in your browser
- 📊 **Task Counter**: See how many tasks you have remaining

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management with useState and useEffect

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

```
todo-app/
├── app/
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Main todo app page
│   └── globals.css     # Global styles with Tailwind
├── public/             # Static assets (if any)
├── .gitignore         # Git ignore file
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## Usage

1. **Add a Todo**: Type your task in the input field and click "Add" or press Enter
2. **Complete a Todo**: Click the checkbox next to a todo to mark it as completed
3. **Delete a Todo**: Click the "Delete" button next to any todo
4. **Filter Todos**: Use the filter buttons to view All, Active, or Completed todos
5. **Clear Completed**: Click "Clear Completed" to remove all completed todos at once

## Features in Detail

### Local Storage Persistence
All your todos are automatically saved to your browser's local storage. This means your todos will persist even after closing the browser tab.

### Responsive Design
The app is fully responsive and works great on desktop, tablet, and mobile devices.

### Dark Mode
The app automatically detects your system's color scheme preference and adjusts accordingly.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and UI inspiration from modern design systems
