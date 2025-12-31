import { loadJobs} from "./lib/downloadJobStatus";

export default function handler(req, res) {
  const { jobId } = req.query;

  const jobs = loadJobs();

  console.log(`Jobs jobId -> ${jobId}`)
  console.log(`Jobs status -> ${JSON.stringify(jobs)}`)

  if (!jobId || !jobs?.[jobId]) {
    return res.status(404).json({ error: "Job not found" });
  }

  return res.status(200).json(jobs[jobId]); 
}
