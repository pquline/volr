# 🚍 Volr - Public Transport Disruption Reporting System

Volr is a modern web application that allows users to report and track public transport disruptions in real-time. Built with Next.js, it provides a user-friendly interface for reporting issues and viewing current disruptions in the transport network.

## ✨ Features

- 🚍 Real-time disruption reporting
- 📍 Location-based reporting
- 🔍 Search and filter disruptions
- 📱 Mobile-responsive design
- 🌙 Dark mode support
- 🎨 Modern UI with shadcn/ui components

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL (via Prisma)
- **Deployment**: TBD (frontend), TBD (backend)

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- Git

### ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pquline/Volr.git
   cd volr
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. Set up the database:
   ```bash
   bun prisma migrate dev
   ```

5. Start the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
volr/
├── app/                # Next.js app directory
│   ├── api/            # API routes
│   └── (routes)/       # Page routes
├── components/         # React components
│   ├── ui/             # UI components
│   └── ...             # Feature components
├── lib/                # Utility functions
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── styles/             # Global styles
```

## 💻 Development

### 📜 Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun prisma generate` - Generate Prisma client
- `bun prisma migrate dev` - Run database migrations

### 🎨 Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## 🚢 Deployment

### 🔧 Backend (TBD)

The backend deployment strategy is currently under development.

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📬 Contact

For any questions or suggestions, please open an issue in the repository.
