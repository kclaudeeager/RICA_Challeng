import { Suspense } from 'react';
import DashboardContent from '../components/DashboardContent';
import Loading from '../components/Loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rwanda Transport Fare Sentiment Analysis',
  description: 'Dashboard for analyzing public sentiment on Rwanda\'s distance-based transport fare system',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">
            Rwanda Transport Fare Sentiment Analysis
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <Suspense fallback={<Loading />}>
          <DashboardContent />
        </Suspense>
      </main>

      <footer className="bg-white border-t mt-auto p-4">
        <div className="max-w-7xl mx-auto flex justify-between text-sm text-gray-600">
          <span>Rwanda Transport Authority</span>
          <span>Sentiment Analysis Dashboard</span>
        </div>
      </footer>
    </div>
  );
}