'use client';

import { useState, useEffect } from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Map, MessageSquare, Filter } from 'lucide-react';
import Loading from './Loading';
import { api } from '../services/api';

export default function DashboardContent() {
        const [activeTab, setActiveTab] = useState('overview');
        const [dateRange, setDateRange] = useState('last30');
        const [selectedSource, setSelectedSource] = useState('all');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        const [sentimentData, setSentimentData] = useState([]);
        const [datasets, setDatasets] = useState([]);
        const [jobStatus, setJobStatus] = useState(null);

        useEffect(() => {
                async function fetchDashboardData() {
                        setLoading(true);
                        setError(null);

                        try {
                                // Fetch datasets as a placeholder for available data
                                const datasetsResponse = await api.listDatasets();
                                setDatasets(datasetsResponse);

                                // Fetch sentiment data for the first dataset as an example
                                if (datasetsResponse.length > 0) {
                                        const datasetId = datasetsResponse[0].id;
                                        const statsResponse = await api.getDatasetStats(datasetId);
                                        setSentimentData(statsResponse.sentiment_over_time || []);
                                }
                        } catch (err) {
                                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                                console.error('Error fetching dashboard data:', err);
                        } finally {
                                setLoading(false);
                        }
                }

                fetchDashboardData();
        }, [dateRange, selectedSource]);

        if (error) {
                return (
                        <div className="flex items-center justify-center h-screen bg-gray-50">
                                <div className="text-center p-6 bg-white rounded-lg shadow">
                                        <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Dashboard</h2>
                                        <p className="text-gray-600">{error}</p>
                                        <button 
                                                onClick={() => window.location.reload()}
                                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                                Retry
                                        </button>
                                </div>
                        </div>
                );
        }

        if (loading) return <Loading />;

        return (
                <div className="flex flex-col h-screen bg-gray-50">
                        <header className="bg-blue-600 text-white p-4">
                                <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                                <Map className="mr-2" />
                                                <h1 className="text-2xl font-bold">Rwanda Transport Fare Sentiment Dashboard</h1>
                                        </div>
                                        <div className="flex space-x-4">
                                                <div className="flex items-center bg-blue-700 px-3 py-1 rounded">
                                                        <Filter size={16} className="mr-1" />
                                                        <select 
                                                                className="bg-transparent text-white border-none outline-none"
                                                                value={dateRange}
                                                                onChange={(e) => setDateRange(e.target.value)}
                                                        >
                                                                <option value="last7">Last 7 days</option>
                                                                <option value="last30">Last 30 days</option>
                                                                <option value="last90">Last 90 days</option>
                                                                <option value="allTime">All time</option>
                                                        </select>
                                                </div>
                                                <div className="flex items-center bg-blue-700 px-3 py-1 rounded">
                                                        <MessageSquare size={16} className="mr-1" />
                                                        <select 
                                                                className="bg-transparent text-white border-none outline-none"
                                                                value={selectedSource}
                                                                onChange={(e) => setSelectedSource(e.target.value)}
                                                        >
                                                                <option value="all">All Sources</option>
                                                                <option value="twitter">Twitter</option>
                                                                <option value="facebook">Facebook</option>
                                                                <option value="news">News Comments</option>
                                                                <option value="forums">Forums</option>
                                                                <option value="sms">SMS Feedback</option>
                                                        </select>
                                                </div>
                                        </div>
                                </div>
                        </header>

                        <main className="flex-1 p-6 overflow-auto">
                                {activeTab === 'overview' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                <div className="bg-white rounded-lg shadow p-4 col-span-full">
                                                        <h2 className="text-lg font-semibold mb-4">Sentiment Trend Over Time</h2>
                                                        <div className="h-64"></div>
                                                        <div className="h-64">
                                                                <ResponsiveContainer width="100%" height="100%">
                                                                        <LineChart data={sentimentData}>
                                                                                <CartesianGrid strokeDasharray="3 3" />
                                                                                <XAxis dataKey="date" />
                                                                                <YAxis />
                                                                                <Tooltip />
                                                                                <Legend />
                                                                                <Line type="monotone" dataKey="positive" stroke="#4CAF50" strokeWidth={2} />
                                                                                <Line type="monotone" dataKey="neutral" stroke="#FFC107" strokeWidth={2} />
                                                                                <Line type="monotone" dataKey="negative" stroke="#F44336" strokeWidth={2} />
                                                                        </LineChart>
                                                                </ResponsiveContainer>
                                                        </div>
                                                </div>
                                        </div>
                                )}
                        </main>
                </div>
        );
}
