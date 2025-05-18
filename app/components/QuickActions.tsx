import { useState } from "react";
import { api } from "../services/api";
import { Loader2Icon } from "lucide-react";

export default function QuickActions() {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("process_type", "sentiment");

    try {
      const data = await api.uploadFile(file, "sentiment");
      console.log("Upload response:", data);

      setJobId(data.job_id);
      setStatus("processing");
      checkJobStatus(data.job_id);
    } catch (err: any) {
      setError("Upload failed: " + err.message);
      setStatus(null);
      setJobId(null);
    }
  };

  const checkJobStatus = async (id: string) => {
    const interval = setInterval(async () => {
      try {
        const data = await api.getJobStatus(id);
        if (data.status === "completed") {
          clearInterval(interval);
          setStatus("Processed Successfully");
          setJobId(null);
          setFile(null);
        } else if (data.status === "failed") {
          clearInterval(interval);
          setStatus("Processing Failed");
        }
      } catch (err) {
        clearInterval(interval);
        setError("Status check failed.");
        setStatus(null);
        setJobId(null);
      }
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 col-span-full mb-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="flex items-center gap-3 max-w-4xl">
        <input
          className="px-2 block flex-1 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          type="file"
          accept="application/json"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={uploadFile}
          disabled={!file}
          className="flex items-center disabled:cursor-not-allowed disabled:opacity-70 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          {status === "processing" && <Loader2Icon className="animate-spin" />}
          Upload Sentiment JSON
        </button>
      </div>
      {status && <p>Status: {status}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
