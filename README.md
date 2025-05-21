# 🚍 volr - Public Transport Disruption Reporting System

`volr` is a modern web application that allows users to report and track public transport disruptions in real-time. Built with Next.js, it provides a user-friendly interface for reporting issues and viewing current disruptions in the transport network.

## ✨ Features

- 🚍 Real-time disruption reporting
- 📍 Location-based reporting
- 🔍 Search and filter disruptions
- 📱 Mobile-responsive design
- 🌙 Dark mode support
- 🎨 Modern UI with shadcn/ui components

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL (via Prisma)
- **Development**: Turbopack for faster development
- **Containerization**: Docker & Docker Compose
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 18+ or Bun
- Docker and Docker Compose (for local database)
- Git

### ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pquline/volr.git
   cd volr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. Start the PostgreSQL database:
   ```bash
   docker-compose up -d
   ```

5. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔧 Development Setup

For a quick development setup, run:
```bash
npm run dev:setup
```
This script will:
- Install dependencies
- Run database migrations
- Import lines
- Seed mock entries

### 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma client
- `npx prisma migrate dev` - Run database migrations
- `npm run dev:setup` - Run the development setup script
- `npm run cleanup` - Clean up development data
- `npm run import` - Import transport lines data

### 🎨 Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Modern ESM configuration

## 🚢 Deployment

### 🔧 Local Development

The project uses Docker Compose for local development:
- Next.js application container
- PostgreSQL database container
- Persistent volume storage for database data
- Easy setup and teardown

To start the development environment:
```bash
docker-compose up -d
```

### 🏗️ Production Deployment

The application is containerized and can be deployed to any container platform (AWS, GCP, Azure, etc.). The Docker setup includes:
- Multi-stage build for optimal production deployment
- Production-ready Node.js environment
- Automatic database migrations
- Environment variable configuration

To build and run the production containers:
```bash
docker-compose -f docker-compose.yml up -d --build
```

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
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Geist](https://vercel.com/font) - Modern typeface by Vercel

## 📬 Contact

For any questions or suggestions, please open an issue in the repository.
