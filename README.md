# Nexus ViewportVerse

A cinematic, interactive portfolio website for Nidhal Gharbi — a full-stack developer crafting futuristic digital experiences. This project features an immersive 3D-like interface with neon aesthetics, real-time chat functionality, and smooth animations powered by modern web technologies.

## 🌟 Features

- **Immersive 3D-like Interface**: Futuristic dashboard with glassmorphism effects and neon styling
- **Interactive Scenes**: Multiple "worlds" for Projects, Skills, Contact, and Live Chat
- **Real-time Chat**: Socket.io-powered live chat with admin dashboard
- **Smooth Animations**: Framer Motion for cinematic transitions and effects
- **Custom Cursor**: Interactive cursor with hover effects
- **Particle Effects**: Dynamic background particles for visual depth
- **Theme Toggle**: Dark/light mode support
- **Responsive Design**: Optimized for all screen sizes
- **Server-Side Rendering**: Built with TanStack Start for SEO and performance

## 🚀 Tech Stack

### Core Framework

- **React 19.2.0** - UI library
- **TanStack Start** - Full-stack React framework with SSR
- **TanStack Router** - File-based routing with type-safe routes
- **TanStack React Query** - Data fetching and state management
- **TypeScript** - Type-safe development

### Build Tools

- **Vite 8.0.16** - Fast build tool and dev server
- **Nitro** - Server engine for TanStack Start

### Styling & UI

- **TailwindCSS 4.2.1** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives
- **shadcn/ui** - Beautiful, accessible component library built on Radix UI
- **Framer Motion 12.40.0** - Production-ready motion library for React
- **Lucide React** - Beautiful & consistent icon toolkit

### Components & Libraries

- **Socket.io 4.8.3** - Real-time bidirectional event-based communication
- **React Hook Form 7.71.2** - Performant forms with easy-to-use validation
- **Zod 3.24.2** - TypeScript-first schema validation
- **Sonner 2.0.7** - Toast notifications
- **Recharts 2.15.4** - Composable charting library
- **Embla Carousel 8.6.0** - Carousel slider component
- **date-fns 4.1.0** - Modern JavaScript date utility library

### Development Tools

- **ESLint 9.32.0** - Code linting
- **Prettier 3.7.3** - Code formatting
- **tsx 4.19.2** - TypeScript execution engine

## 📁 Project Structure

```
nexus-viewport-verse-main/
├── src/
│   ├── assets/              # Static assets (images, etc.)
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ChatWidget.tsx   # Chat widget component
│   │   ├── Cursor.tsx       # Custom cursor
│   │   ├── Laptop.tsx       # Interactive laptop portal
│   │   ├── Particles.tsx    # Background particles
│   │   ├── ThemeToggle.tsx  # Theme switcher
│   │   ├── Worlds.tsx       # Scene components (Projects, Skills, Contact, Chat)
│   │   └── chat-component.tsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   └── lovable-error-reporting.ts
│   ├── routes/              # File-based routes
│   │   ├── __root.tsx       # Root layout
│   │   ├── index.tsx        # Home page
│   │   └── admin.tsx        # Admin chat dashboard
│   ├── client.tsx           # Client entry point
│   ├── server.ts            # Server entry point
│   ├── router.tsx           # Router configuration
│   ├── start.ts             # TanStack Start entry
│   ├── styles.css           # Global styles
│   └── routeTree.gen.ts     # Auto-generated route tree
├── .env.example             # Environment variables template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── index.html               # HTML entry point
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nexus-viewport-verse-main
   ```
2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```
3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Web3Forms access key:

   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```

## 🏃 Running the Project

### Development Server

```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Vite Development Server (Alternative)

```bash
bun run dev:vite
# or
npm run dev:vite
```

### Build for Production

```bash
bun run build
# or
npm run build
```

### Preview Production Build

```bash
bun run preview
# or
npm run preview
```

## 📜 Available Scripts

- `dev` - Start development server with TanStack Start
- `dev:vite` - Start Vite development server
- `build` - Build for production
- `build:dev` - Build for development mode
- `preview` - Preview production build
- `lint` - Run ESLint
- `format` - Format code with Prettier

## 🔧 Configuration

### Routing

This project uses **TanStack Router** with file-based routing. Routes are defined in the `src/routes/` directory:

- `index.tsx` → `/` (Home page)
- `admin.tsx` → `/admin` (Admin chat dashboard)
- `__root.tsx` → Root layout (wraps all pages)

### Styling

- **TailwindCSS** for utility classes
- Custom CSS variables for theming (defined in `styles.css`)
- Glassmorphism and neon effects for futuristic aesthetic

### Real-time Chat

The chat functionality uses **Socket.io** for real-time communication:

- Visitors can initiate chats from the main site
- Admin can manage conversations via `/admin` (password protected)
- Messages are stored in memory during the session

## 🎨 Key Components

### Worlds Component

Contains the main content sections:

- **ProjectsWorld** - Showcase of projects and experiments
- **SkillsWorld** - Technical skills and expertise
- **ContactWorld** - Contact form and information
- **ChatWorld** - Live chat interface

### Laptop Component

Interactive 3D laptop that serves as the portal to enter the portfolio dashboard.

### Particles Component

Dynamic background particle system for visual depth and atmosphere.

### ChatWidget

Floating chat widget for real-time communication with visitors.

## 🔐 Admin Access

The admin dashboard at `/admin` is password-protected. Default credentials are configured in the code (should be changed for production).

## 🌐 Environment Variables

- `VITE_WEB3FORMS_ACCESS_KEY` - Required for contact form functionality (get free key at [web3forms.com](https://web3forms.com))
- `VITE_SOCKET_SERVER_URL` - Socket.io server URL for real-time chat (required for chat functionality)

## 💬 Chat Server Deployment

The real-time chat functionality requires a separate Socket.io server deployment since Netlify only hosts static files.

### Quick Setup

1. **Deploy the Socket.io server** (choose one platform):
   - **Railway** (recommended): See `socket-server/README.md` for detailed instructions
   - **Render**: See `socket-server/README.md` for detailed instructions
   - **Heroku**: See `socket-server/README.md` for detailed instructions

2. **Update environment variable**:
   - Copy the deployed Socket.io server URL (e.g., `https://your-app.railway.app`)
   - Add to your `.env` file: `VITE_SOCKET_SERVER_URL=https://your-app.railway.app`
   - Add to Netlify environment variables in your project settings

3. **Redeploy frontend**:
   - Push changes to trigger Netlify rebuild
   - Chat functionality will now connect to your deployed Socket.io server

### Local Development

For local development, the Socket.io server is integrated into the dev server. Simply run:
```bash
npm run dev
```

The chat will automatically connect to `http://localhost:5173`.

### Socket.io Server Location

The standalone Socket.io server is located in the `socket-server/` directory with its own `package.json` and deployment instructions.

## 📝 Development Notes

- The project uses **TanStack Start** which provides server-side rendering and file-based routing
- Route tree is auto-generated - do not edit `routeTree.gen.ts` manually
- All components use TypeScript for type safety
- ESLint and Prettier are configured for code quality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👤 Author

**Nidhal Gharbi**

- Full-Stack Developer
- Portfolio: [nidhal.gharbi]

---

Built with ❤️ using TanStack Start, React, and modern web technologies.
