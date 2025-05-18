"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Map,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import QuickActions from "./QuickActions";

// Mock data for demonstration purposes
// const sentimentOverTime = [
//   { month: "Jan", positive: 30, neutral: 45, negative: 25 },
//   { month: "Feb", positive: 25, neutral: 40, negative: 35 },
//   { month: "Mar", positive: 20, neutral: 35, negative: 45 },
//   { month: "Apr", positive: 15, neutral: 30, negative: 55 },
//   { month: "May", positive: 25, neutral: 35, negative: 40 },
// ];

// const topConcerns = [
//   { name: "Price Increases", count: 450, percentage: 32 },
//   { name: "Fare Calculation", count: 320, percentage: 23 },
//   { name: "Rural Impact", count: 230, percentage: 16 },
//   { name: "Payment Methods", count: 190, percentage: 14 },
//   { name: "System Reliability", count: 120, percentage: 9 },
//   { name: "Other", count: 90, percentage: 6 },
// ];

// const sourcesData = [
//   { name: "Twitter", value: 35 },
//   { name: "Facebook", value: 25 },
//   { name: "News Comments", value: 20 },
//   { name: "Forums", value: 12 },
//   { name: "SMS Feedback", value: 8 },
// ];

// const demographicData = [
//   { name: "Urban", value: 60 },
//   { name: "Rural", value: 25 },
//   { name: "Unknown", value: 15 },
// ];

// const trendingTopics = [
//   { topic: "Price fairness", volume: 245, sentiment: -0.6 },
//   { topic: "Tap card issues", volume: 188, sentiment: -0.8 },
//   { topic: "Route changes", volume: 152, sentiment: -0.3 },
//   { topic: "Implementation pace", volume: 134, sentiment: -0.4 },
//   { topic: "Distance accuracy", volume: 127, sentiment: -0.7 },
// ];

// const analysisBySource = [
//   {
//     name: "Twitter",
//     positive: 20,
//     neutral: 30,
//     negative: 50,
//   },
//   {
//     name: "Facebook",
//     positive: 25,
//     neutral: 35,
//     negative: 40,
//   },
//   { name: "News", positive: 30, neutral: 40, negative: 30 },
//   {
//     name: "Forums",
//     positive: 15,
//     neutral: 35,
//     negative: 50,
//   },
//   { name: "SMS", positive: 20, neutral: 30, negative: 50 },
// ];

// const analysisByRegion = [
//   {
//     name: "Kigali",
//     positive: 15,
//     neutral: 25,
//     negative: 60,
//   },
//   {
//     name: "Eastern",
//     positive: 20,
//     neutral: 30,
//     negative: 50,
//   },
//   {
//     name: "Western",
//     positive: 10,
//     neutral: 20,
//     negative: 70,
//   },
//   {
//     name: "Northern",
//     positive: 25,
//     neutral: 35,
//     negative: 40,
//   },
//   {
//     name: "Southern",
//     positive: 20,
//     neutral: 30,
//     negative: 50,
//   },
// ]

// const analysisByDemographic = [
//   {
//     name: "Students",
//     positive: 10,
//     neutral: 20,
//     negative: 70,
//   },
//   {
//     name: "Workers",
//     positive: 20,
//     neutral: 30,
//     negative: 50,
//   },
//   {
//     name: "Elderly",
//     positive: 5,
//     neutral: 15,
//     negative: 80,
//   },
//   {
//     name: "Business",
//     positive: 30,
//     neutral: 40,
//     negative: 30,
//   },
// ];

const alertsData = [
  {
    id: 1,
    title: "Fare calculation misinformation spreading",
    description: "Multiple viral posts claiming incorrect fare calculations",
    severity: "high",
    source: "Twitter",
    date: "2025-05-16",
  },
  {
    id: 2,
    title: "Rural transport concerns rising",
    description:
      "Growing sentiment that rural areas are disproportionately affected",
    severity: "medium",
    source: "Forums",
    date: "2025-05-17",
  },
  {
    id: 3,
    title: "Payment system reliability issues",
    description: "Increasing complaints about payment system failures",
    severity: "medium",
    source: "SMS Feedback",
    date: "2025-05-15",
  },
];

const COLORS = [
  "#4CAF50",
  "#FFC107",
  "#F44336",
  "#2196F3",
  "#9C27B0",
  "#607D8B",
];

export default function StatisticsDashboard({
  sentimentOverTime,
  topConcerns,
  sourcesData,
  demographicData,
  trendingTopics,
  analysisBySource,
  analysisByRegion,
  analysisByDemographic,
}: {
  sentimentOverTime: any[];
  topConcerns: any[];
  sourcesData: any[];
  demographicData: any[];
  trendingTopics: any[];
  analysisBySource: any[];
  analysisByRegion: any[];
  analysisByDemographic: any[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("tab") || "overview";

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Map className="mr-2" />
            <h1 className="text-2xl font-bold">
              Rwanda Transport Fare Sentiment Dashboard
            </h1>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center bg-blue-700 px-3 py-1 rounded">
              <Filter size={16} className="mr-1" />
              <select
                className="bg-transparent text-white border-none outline-none"
                value={searchParams.get("year") || new Date().getFullYear()}
                onChange={(e) => {
                  const newParams = new URLSearchParams(
                    searchParams.toString()
                  );
                  newParams.set("year", e.target.value);
                  router.push(`?${newParams.toString()}`);
                }}>
                <option value={new Date().getFullYear()} className="text-black">
                  This Year
                </option>
                <option
                  value={new Date().getFullYear() - 1}
                  className="text-black">
                  Last Year
                </option>
              </select>
            </div>
            <div className="flex items-center bg-blue-700 px-3 py-1 rounded">
              <MessageSquare size={16} className="mr-1" />
              <select
                className="bg-transparent text-white border-none outline-none"
                value={searchParams.get("source") || "all"}
                onChange={(e) => {
                  const newParams = new URLSearchParams(
                    searchParams.toString()
                  );
                  newParams.set("source", e.target.value);
                  router.push(`?${newParams.toString()}`);
                }}>
                <option value="all" className="text-black">
                  All Sources
                </option>
                <option value="twitter" className="text-black">
                  Twitter
                </option>
                <option value="facebook" className="text-black">
                  Facebook
                </option>
                <option value="news" className="text-black">
                  News Comments
                </option>
                <option value="forums" className="text-black">
                  Forums
                </option>
                <option value="sms" className="text-black">
                  SMS Feedback
                </option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="flex">
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("tab", "overview");
              router.push(`?${newParams.toString()}`);
            }}>
            Overview
          </button>
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === "trends"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("tab", "trends");
              router.push(`?${newParams.toString()}`);
            }}>
            Trends
          </button>
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === "alerts"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("tab", "alerts");
              router.push(`?${newParams.toString()}`);
            }}>
            Alerts
          </button>
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === "recommendations"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("tab", "recommendations");
              router.push(`?${newParams.toString()}`);
            }}>
            Recommendations
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto text-black">
        <QuickActions />
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sentiment Overview */}
            <div className="bg-white rounded-lg shadow p-4 col-span-full">
              <h2 className="text-lg font-semibold mb-4">
                Sentiment Trend Over Time
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="positive"
                      stroke="#4CAF50"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="neutral"
                      stroke="#FFC107"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="negative"
                      stroke="#F44336"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  The sentiment trend shows a significant increase in negative
                  sentiment following the implementation of distance-based fares
                  in March 2025, with a slight recovery in May.
                </p>
              </div>
            </div>

            {/* Top Concerns */}
            <div className="bg-white rounded-lg shadow p-4 col-span-1 lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">
                Top Public Concerns
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topConcerns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2196F3">
                      {topConcerns.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {topConcerns.map((concern, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 mr-2"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}></div>
                    <span className="text-sm">
                      {concern.name}: {concern.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Data Sources</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourcesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      {sourcesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  Data collected from various sources to ensure comprehensive
                  representation of public sentiment.
                </p>
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-white rounded-lg shadow p-4 col-span-full md:col-span-1">
              <h2 className="text-lg font-semibold mb-4">Demographics</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }>
                      {demographicData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  Most feedback comes from urban areas, suggesting a need for
                  more rural outreach.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "trends" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-4 col-span-full">
              <h2 className="text-lg font-semibold mb-4">Trending Topics</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Topic</th>
                      <th className="px-4 py-2 text-left">Volume</th>
                      <th className="px-4 py-2 text-left">Sentiment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trendingTopics.map((topic, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3">{topic.topic}</td>
                        <td className="px-4 py-3">{topic.volume}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div
                              className={`w-16 h-2 rounded ${
                                topic.sentiment > 0
                                  ? "bg-green-500"
                                  : topic.sentiment > -0.5
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}></div>
                            <span className="ml-2">
                              {topic.sentiment.toFixed(1)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 col-span-full">
              <h2 className="text-lg font-semibold mb-4">
                Sentiment Analysis by Source
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysisBySource}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" stackId="a" fill="#4CAF50" />
                    <Bar dataKey="neutral" stackId="a" fill="#FFC107" />
                    <Bar dataKey="negative" stackId="a" fill="#F44336" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">
                Sentiment by Geographic Region
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysisByRegion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" fill="#4CAF50" />
                    <Bar dataKey="neutral" fill="#FFC107" />
                    <Bar dataKey="negative" fill="#F44336" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">
                Sentiment by Demographics
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysisByDemographic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" fill="#4CAF50" />
                    <Bar dataKey="neutral" fill="#FFC107" />
                    <Bar dataKey="negative" fill="#F44336" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-4">
                <AlertTriangle className="text-red-500 mr-2" />
                <h2 className="text-lg font-semibold">Alert Center</h2>
              </div>
              <div className="space-y-4">
                {alertsData.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-l-4 rounded ${
                      alert.severity === "high"
                        ? "border-red-500 bg-red-50"
                        : alert.severity === "medium"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-blue-500 bg-blue-50"
                    }`}>
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{alert.title}</h3>
                      <span className="text-sm text-gray-600">
                        {alert.date}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{alert.description}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                        {alert.source}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          alert.severity === "high"
                            ? "bg-red-200 text-red-800"
                            : alert.severity === "medium"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-blue-200 text-blue-800"
                        }`}>
                        {alert.severity} priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">
                Misinformation Tracking
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Claim</th>
                      <th className="px-4 py-2 text-left">Spread</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Action Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-3">
                        "Fare increases are double what was announced"
                      </td>
                      <td className="px-4 py-3">High</td>
                      <td className="px-4 py-3">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          False
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        Official clarification needed
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3">
                        "The system overcharges short trips"
                      </td>
                      <td className="px-4 py-3">Medium</td>
                      <td className="px-4 py-3">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                          Partially True
                        </span>
                      </td>
                      <td className="px-4 py-3">Technical review</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3">
                        "Rural routes will be discontinued"
                      </td>
                      <td className="px-4 py-3">Medium</td>
                      <td className="px-4 py-3">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                          False
                        </span>
                      </td>
                      <td className="px-4 py-3">Public statement needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">
                Policy Recommendations
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold">
                    Enhance Communication Strategy
                  </h3>
                  <p className="text-sm mt-1">
                    Launch a comprehensive information campaign about how the
                    distance-based system works, with clear examples of common
                    routes and their costs.
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      High Priority
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Based on 65% of negative feedback regarding understanding
                      the system
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold">
                    Fare Adjustment for Short Distances
                  </h3>
                  <p className="text-sm mt-1">
                    Consider implementing a reduced minimum fare for very short
                    trips (under 2km) to address concerns about fairness for
                    short-distance travelers.
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Medium Priority
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Based on pricing concerns from 32% of urban commuters
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <h3 className="font-semibold">Rural Area Support Program</h3>
                  <p className="text-sm mt-1">
                    Develop special subsidies or fare caps for rural areas where
                    distances are typically longer and public transport is
                    essential for economic activity.
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      High Priority
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Based on significant negative sentiment (78%) from rural
                      communities
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold">
                    Payment System Reliability Improvement
                  </h3>
                  <p className="text-sm mt-1">
                    Address technical issues with the tap card payment system to
                    reduce transaction failures and improve user confidence.
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      Medium Priority
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Based on increasing complaints (23% growth over past
                      month)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">
                Community Engagement Strategy
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded">
                  <h3 className="font-semibold">Town Hall Meetings</h3>
                  <p className="text-sm mt-1">
                    Organize public forums in areas with high negative sentiment
                    to directly address concerns and gather feedback.
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Suggested Locations: Western Province, Kigali Suburbs
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded">
                  <h3 className="font-semibold">Educational Campaign</h3>
                  <p className="text-sm mt-1">
                    Develop simple, visual materials explaining how the
                    distance-based system works and its benefits compared to
                    flat-rate fares.
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Target Audience: Students, Elderly, First-time Users
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded">
                  <h3 className="font-semibold">
                    Feedback Collection Expansion
                  </h3>
                  <p className="text-sm mt-1">
                    Implement QR code-based feedback systems in vehicles and at
                    stations to increase data collection from underrepresented
                    areas.
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Focus: Rural Areas, Young and Elderly Populations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white p-4 border-t">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Last updated: May 18, 2025 | 1,400 data points analyzed</span>
          <span>
            Rwanda Transport Authority | Public Sentiment Analysis Tool
          </span>
        </div>
      </footer>
    </div>
  );
}
