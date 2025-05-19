import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
console.log("API_BASE_URL", API_BASE_URL);

export const api = {
  // Sentiment Analysis
  async analyzeSentiment(text: string, language: string = "English") {
    const response = await axios.post(`${API_BASE_URL}/api/analyze`, null, {
      params: { text, language },
    });
    return response.data;
  },

  // Dataset Management
  async getDatasetStats(datasetId: string) {
    const response = await axios.get(`${API_BASE_URL}/api/stats/${datasetId}`);
    return response.data;
  },

  async listDatasets() {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/datasets`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                console.error('Datasets endpoint not found. Please check if the API server is running and the endpoint exists.');
                return []; // Return empty array as fallback
            }
            throw new Error(`Failed to fetch datasets: ${error.message}`);
        }
        throw error;
    }
},

  // File Processing
  async uploadFile(file: File, processType: string = "sentiment") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("process_type", processType);

    const response = await axios.post(`${API_BASE_URL}/api/upload`, formData);
    return response.data;
  },

  // Job Status
  async getJobStatus(jobId: string) {
    const response = await axios.get(`${API_BASE_URL}/api/status/${jobId}`);
    return response.data;
  },

  async getJobResult(jobId: string) {
    const response = await axios.get(`${API_BASE_URL}/api/result/${jobId}`);
    return response.data;
  },

  async getAllSentiments() {
    const {
      data: { sentiments },
    } = await axios.get(`${API_BASE_URL}/api/all-sentiments`);
    return sentiments;
  },
};
