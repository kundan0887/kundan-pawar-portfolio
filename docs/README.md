# Kundan Profile Site

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **ESLint & Prettier** for code quality
- **Responsive Design** for all devices
- **Dark Mode** support

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   └── ui/             # UI components (Button, Card, etc.)
├── lib/                # Utility functions and helpers
└── types/              # TypeScript type definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd kundan-profile-site
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Customization

### Colors and Styling

The project uses Tailwind CSS with a custom color palette. You can customize colors in the `tailwind.config.ts` file.

### Components

Reusable components are located in `src/components/ui/`. Each component is built with TypeScript and follows a consistent design pattern.

### Animations

Framer Motion is used for smooth animations. You can customize animation properties in the motion components.

## 📱 Responsive Design

The site is fully responsive and works on:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌙 Dark Mode

The site supports dark mode with automatic detection based on system preferences.

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration

## 📦 Dependencies

### Production Dependencies

- `next` - React framework
- `react` - UI library
- `react-dom` - React DOM rendering
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `@next/font` - Google Fonts integration
- `clsx` - Conditional className utility
- `tailwind-merge` - Tailwind class merging utility

### Development Dependencies

- `typescript` - TypeScript compiler
- `@types/node` - Node.js types
- `@types/react` - React types
- `@types/react-dom` - React DOM types
- `eslint` - Code linting
- `eslint-config-next` - Next.js ESLint config
- `prettier` - Code formatting
- `tailwindcss` - CSS framework

## 🚀 Deployment

The site can be deployed to various platforms:

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` directory

### Other Platforms

The site can be deployed to any platform that supports Next.js applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- Email: contact@example.com
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

Built with ❤️ using Next.js 14
