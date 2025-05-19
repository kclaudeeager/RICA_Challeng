# Rwanda Transport Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager
- Python 3.8 or higher (for backend)
- pip (Python package manager)

## Getting Started

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/kclaudeeager/RICA_Challeng.git
cd rwanda-transport-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add required environment variables:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000  # Replace with your backend URL
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory:
```bash
GROQ_API_KEY=your_groq_api_key_here
```

For more details about the backend configuration, please refer to the [backend README](./backend/README.md).

4. Run the development servers:

Frontend (from root directory):
```bash
npm run dev
# or
yarn dev
```

Backend (from backend directory):
```bash
uvicorn backend_api:app --reload
```
or 
```bash
python3 backend_api.py
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.
   The backend API will be available at [http://localhost:8000](http://localhost:8000).


## Project Structure

```
rwanda-transport-dashboard/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── public/          # Static files
└── styles/          # CSS styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
