# Project Name

Full-stack application with Flutter client and Node.js server.

## Structure

- `client/`: Flutter mobile application
- `server/`: Node.js backend server

## Prerequisites

- Flutter SDK
- Node.js (v16 or higher)
- Docker & Docker Compose (optional)
- Git

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd <project-name>
```

### Setting up the server

```bash
cd server
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

### Setting up the client

```bash
cd client
flutter pub get
flutter run
```

### Running with Docker (optional)

```bash
docker-compose up
```

## Development Workflow

1. Create feature branches from `main`
2. Follow conventional commits
3. Submit PRs for review
4. Merge only after CI passes and approval

## Contributing

See CONTRIBUTING.md for detailed guidelines.

## License
