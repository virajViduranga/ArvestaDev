const fs = require('fs').promises;
const path = require('path');
const os = require('os');

async function cleanupTempFiles() {
  const tempDir = os.tmpdir();
  const maxAgeMs = 60 * 60 * 1000; // 1 hour in milliseconds
  const now = Date.now();

  try {
    const files = await fs.readdir(tempDir);
    
    for (const file of files) {
      // Only check files that belong to our application
      if (file.includes('_input_') || file.includes('_output') || file.includes('_ocr.pdf')) {
        const filePath = path.join(tempDir, file);
        const stats = await fs.stat(filePath);
        
        // Delete the file if it is older than 1 hour
        if (now - stats.mtimeMs > maxAgeMs) {
          await fs.unlink(filePath);
          console.log(`Deleted orphaned file: ${file}`);
        }
      }
    }
    console.log("Cleanup finished successfully.");
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
}

cleanupTempFiles();