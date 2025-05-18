import StatisticsDashboard from "../components/StatisticsDashboard";
import { api } from "../services/api";

type Sentiment = "positive" | "neutral" | "negative";

interface TopicStats {
  volume: number;
  sentimentSum: number;
}

async function getStatisticsData(year?: string, source?: string) {
  const sentiments = await api.getAllSentiments();
  const filteredSentiments = sentiments
    .filter((sentiment: any) => {
      const _year = new Date(sentiment.date).getFullYear();
      const currentYear = new Date().getFullYear();
      if (!!year) {
        return _year === parseInt(year);
      }
      return _year === currentYear;
    })
    .filter((sentiment: any) => {
      if (!!source && source !== "all") {
        return sentiment.source.toLowerCase() === source;
      }
      return true;
    });

  const monthMap = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize empty monthly data
  const sentimentOverTime = monthMap.map((month) => ({
    month,
    positive: 0,
    neutral: 0,
    negative: 0,
  }));

  // Count sentiments by month
  for (const entry of filteredSentiments) {
    const date = new Date(entry.date);
    const monthIndex = date.getMonth(); // 0-based index for months
    const sentiment = entry.sentiment as Sentiment;

    if (["positive", "neutral", "negative"].includes(sentiment)) {
      sentimentOverTime[monthIndex][sentiment]++;
    }
  }

  // Step 1: Count occurrences of each topic
  const topicCounts: Record<string, number> = {};

  for (const entry of filteredSentiments) {
    const topic = entry.topic || "Other";
    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
  }

  // Step 2: Total all counts
  const total = Object.values(topicCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // Step 3: Format and sort the topics by count
  const topConcerns = Object.entries(topicCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const sourceCounts: Record<string, number> = {};

  for (const entry of filteredSentiments) {
    const source = entry.source || "Other";
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  }

  // Step 2: Convert to array format
  const sourcesData = Object.entries(sourceCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Step 1: Count each demographic
  const demographicCounts: Record<string, number> = {};

  for (const entry of filteredSentiments) {
    const demographic = entry.demographic || "Unknown";
    demographicCounts[demographic] = (demographicCounts[demographic] || 0) + 1;
  }

  // Step 2: Format the results
  const demographicData = Object.entries(demographicCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const topicStats: Record<string, TopicStats> = {};

  const sentimentScore = {
    positive: 1,
    neutral: 0,
    negative: -1,
  };

  for (const entry of filteredSentiments) {
    const topic = entry.topic || "Other";
    const score = sentimentScore[entry.sentiment as Sentiment] ?? 0;

    if (!topicStats[topic]) {
      topicStats[topic] = { volume: 0, sentimentSum: 0 };
    }

    topicStats[topic].volume += 1;
    topicStats[topic].sentimentSum += score;
  }

  // Step 2: Format the results
  const trendingTopics = Object.entries(topicStats)
    .map(([topic, { volume, sentimentSum }]) => ({
      topic,
      volume,
      sentiment: parseFloat((sentimentSum / volume).toFixed(2)), // average score
    }))
    .sort((a, b) => b.volume - a.volume); // sort by volume

  // Step 1: Count sentiments per source
  const sourceSentimentMap: Record<
    string,
    { positive: number; neutral: number; negative: number }
  > = {};

  for (const entry of filteredSentiments) {
    const source = entry.source || "Unknown";
    const sentiment = entry.sentiment as Sentiment;

    if (!sourceSentimentMap[source]) {
      sourceSentimentMap[source] = { positive: 0, neutral: 0, negative: 0 };
    }

    if (sentiment in sourceSentimentMap[source]) {
      sourceSentimentMap[source][sentiment]++;
    }
  }

  // Step 2: Format result
  const analysisBySource = Object.entries(sourceSentimentMap).map(
    ([name, sentiments]) => ({
      name,
      ...sentiments,
    })
  );

  // Step 1: Count sentiments per region
  const regionSentimentMap: Record<
    string,
    { positive: number; neutral: number; negative: number }
  > = {};

  for (const entry of filteredSentiments) {
    const region = entry.region || "Unknown";
    const sentiment = entry.sentiment as Sentiment;

    if (!regionSentimentMap[region]) {
      regionSentimentMap[region] = { positive: 0, neutral: 0, negative: 0 };
    }

    if (sentiment in regionSentimentMap[region]) {
      regionSentimentMap[region][sentiment]++;
    }
  }

  // Step 2: Format result
  const analysisByRegion = Object.entries(regionSentimentMap).map(
    ([name, sentiments]) => ({
      name,
      ...sentiments,
    })
  );

  const demographicSentimentMap: Record<
    string,
    { positive: number; neutral: number; negative: number }
  > = {};

  for (const entry of filteredSentiments) {
    const demographic = entry.demographic || "Unknown";
    const sentiment = entry.sentiment as Sentiment;

    if (!demographicSentimentMap[demographic]) {
      demographicSentimentMap[demographic] = {
        positive: 0,
        neutral: 0,
        negative: 0,
      };
    }

    if (sentiment in demographicSentimentMap[demographic]) {
      demographicSentimentMap[demographic][sentiment]++;
    }
  }

  // Step 2: Format result
  const analysisByDemographic = Object.entries(demographicSentimentMap).map(
    ([name, sentiments]) => ({
      name,
      ...sentiments,
    })
  );

  return {
    sentimentOverTime,
    topConcerns,
    sourcesData,
    demographicData,
    trendingTopics,
    analysisBySource,
    analysisByRegion,
    analysisByDemographic,
  };
}

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{
    year?: string;
    source?: string;
  }>;
}) {
  const { year, source } = await searchParams;
  const stats = await getStatisticsData(year, source);
  return (
    <StatisticsDashboard
      sentimentOverTime={stats.sentimentOverTime}
      topConcerns={stats.topConcerns}
      sourcesData={stats.sourcesData}
      demographicData={stats.demographicData}
      trendingTopics={stats.trendingTopics}
      analysisBySource={stats.analysisBySource}
      analysisByRegion={stats.analysisByRegion}
      analysisByDemographic={stats.analysisByDemographic}
    />
  );
}
