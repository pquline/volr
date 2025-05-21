<p align="center">
  <img src="public/logo.png" alt="Volr Logo" width="60" />
</p>

<h1 align="center">VOLR</h1>
<p align="center"><em>Public Transport Disruption Reporter</em></p>

<p align="center">
  A modern web application for reporting and tracking public transport disruptions.<br/>
  Built with Next.js, TypeScript, and PostgreSQL.
</p>

---

## ✨ Features

- 🚌 Real-time disruption reporting for public transport lines
- 🌍 Multi-city support
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with dark mode support
- 🔍 Searchable line and station selection
- 🔒 Secure API endpoints

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Hooks
- **API**: Next.js API Routes with middleware protection
- **Development**: Turbopack for fast development
- **Notifications**: Sonner toast notifications
- **UI Components**: Radix UI primitives

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Docker (optional, for containerized development)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/pquline/volr.git
   cd volr
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/volr"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   # Run database migrations
   npx prisma migrate dev

   # Import initial line data
   npm run import
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
volr/
├── actions/          # Server actions for data operations
├── app/             # Next.js app router pages and API routes
├── components/      # React components
├── lib/            # Utility functions and shared code
├── prisma/         # Database schema and migrations
├── public/         # Static assets
├── scripts/        # Utility scripts
└── types/          # TypeScript type definitions
```

## 💾 Database Schema

### Line Model
- Represents a public transport line
- Fields: id, city, name, order, type, stations
- Supports multiple cities and line types

### Entry Model
- Represents a disruption report
- Fields: id, city, station, comment, lineId, lineName
- Tracks edit history and timestamps

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run import` - Import line data
- `npm run cleanup` - Clean up development data

### Database Management

- Use Prisma Studio for database management:
  ```bash
  npx prisma studio
  ```

- Reset database and apply migrations:
  ```bash
  npx prisma migrate reset
  ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Geist](https://vercel.com/font) - Modern typeface by Vercel

## 📬 Contact

For any questions or suggestions, please open an issue in the repository.
