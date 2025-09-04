# Patient Management Frontend

Modern React-based frontend application for patient management built with **Next.js 14**, **shadcn/ui components**, and **Tailwind CSS**.

## Features

- **Modern React**: Built with Next.js 14 App Router
- **shadcn/ui Components**: Professional UI components with consistent design
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Responsive Design**: Mobile-first responsive layout
- **API Integration**: Axios-based API client for backend communication
- **Toast Notifications**: User feedback with toast messages
- **Form Validation**: Client-side validation with proper error handling

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── toast.tsx
│   └── patient-form.tsx  # Patient creation form
└── lib/                  # Utilities and configurations
    ├── api.ts           # API client and types
    └── utils.ts         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- Patient Service API running on port 3000

### Installation

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```bash
# API endpoint
NEXT_PUBLIC_API_URL=http://localhost:3000

# Application port
PORT=3001
```

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Docker Usage

### Local Development

```bash
# Build and run with docker-compose (from parent directory)
cd ../patient-service
docker-compose up --build frontend

# Access frontend
open http://localhost:3001
```

### Production Build

```bash
# Build Docker image
docker build -t patient-frontend .

# Run container
docker run -p 3001:3001 \
  -e NEXT_PUBLIC_API_URL=http://api:3000 \
  patient-frontend
```

## Features Overview

### Patient Registration Form

- **Form Fields**: Name, email, and birthdate input
- **Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during form submission
- **Success/Error Handling**: Toast notifications for user feedback

### UI Components

All UI components follow shadcn/ui patterns:

- **Button**: Various variants (default, outline, secondary)
- **Input**: Form inputs with proper styling and focus states
- **Label**: Accessible form labels
- **Card**: Content containers with header, content, and footer
- **Toast**: Notification system for user feedback

### Responsive Design

- Mobile-first approach
- Responsive typography and spacing
- Optimized for desktop and mobile devices
- Consistent design system with CSS custom properties

## API Integration

The frontend communicates with the Patient Service API:

```typescript
// Create patient
POST /patients
{
  "name": "John Smith",
  "email": "john.smith@example.com", 
  "birthdate": "1990-01-01"
}
```

### Error Handling

- Network error handling
- API error response handling
- User-friendly error messages
- Automatic form reset on success

## Styling

### CSS Custom Properties

Uses CSS custom properties for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}
```

### Utility Classes

Consistent spacing and typography using Tailwind utilities:

- `space-y-*` for vertical spacing
- `max-w-*` for responsive width constraints
- `text-*` for typography scales
- `border-*` for consistent borders

## Browser Support

- Modern browsers with ES2020+ support
- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Performance

- Next.js automatic code splitting
- Optimized bundle sizes
- Tree-shaking for unused code
- Static generation where possible

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod
```

### Docker

```bash
# Build production image
docker build -t patient-frontend .

# Run in production
docker run -p 3001:3001 patient-frontend
```

### Environment-specific Configuration

Set appropriate environment variables for different deployments:

- `NEXT_PUBLIC_API_URL`: Backend API endpoint
- `PORT`: Application port (default: 3001)
