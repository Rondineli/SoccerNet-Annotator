import { spawn } from "child_process";
import { loadJobs, saveJobs } from "./downloadJobStatus.js";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "public/videos");

const outputTemplate = `${OUTPUT_DIR}/%(title)s [%(id)s].%(ext)s`;


export function startDownload(jobId, videoUrl) {
  const jobs = loadJobs();

  jobs[jobId].status = "downloading";
  saveJobs(jobs);

  const child = spawn("yt-dlp", [
    "-o",
    outputTemplate,
    videoUrl,
  ]);

  child.stdout.on("data", (data) => {
    const line = data.toString();

    console.log("Line => :", line);
  
    const match = line.match(/(\d+(?:\.\d+)?)%/);
  
    if (match) {
      const percent = parseFloat(match[1]);
      
  
      jobs[jobId].progress = Math.min(100, Math.floor(percent));
      saveJobs(jobs);
    }
  });

  child.on("close", () => {
    jobs[jobId].status = "done";
    saveJobs(jobs);
  });
}
