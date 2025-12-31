import { v4 as uuidv4 } from "uuid";
import { loadJobs, saveJobs } from "./lib/downloadJobStatus";
import { startDownload } from "./lib/downloadWorker";


export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { youtubeUrlOrId } = req.body;

  if (!youtubeUrlOrId) {
    return res.status(400).json({ error: "Missing youtubeUrlOrId" });
  }

  const jobId = uuidv4();

  const videoUrl = youtubeUrlOrId.videoUrl.startsWith("http")
    ? youtubeUrlOrId.videoUrl
    : `https://www.youtube.com/watch?v=${youtubeUrlOrId.videoUrl}`;

  const jobs = loadJobs();

  jobs[jobId] = {
    id: jobId,
    status: "pending",
    progress: 0,
    message: "Queued"
  };

  saveJobs(jobs);

  startDownload(jobId, videoUrl);

  return res.status(200).json({ jobId });
}
