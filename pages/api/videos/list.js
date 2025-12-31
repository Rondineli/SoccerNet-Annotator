import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const dirPath = path.join(process.cwd(), "public/videos");
    const files = fs.readdirSync(dirPath);

    // Map into public URLs
    const fileUrls = files
      .filter((file) => file.toLowerCase().endsWith(".mp4"))
      .map((file) => `/videos/${file}`);

    console.log("Super files:", fileUrls);
    console.log(`Total of: ${fileUrls.length}`)

    res.status(200).json({ files: fileUrls });
  } catch (err) {
    console.error("Error reading directory:", err);
    res.status(500).json({ error: err.message });
  }
}
