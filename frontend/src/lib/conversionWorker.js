import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import crypto from 'crypto';

const execAsync = promisify(exec);

// In-memory store for jobs. (For a distributed setup later, this would be Redis).
const jobs = new Map();

export async function createJob(fileBuffer, originalName, operation) {
  const jobId = crypto.randomUUID();
  const tempDir = os.tmpdir();
  
  // Create safe temporary file paths
  const safeName = originalName.replace(/[^a-zA-Z0-9.]/g, '_');
  const inputPath = path.join(tempDir, `${jobId}_input_${safeName}`);
  
  // Determine output extension based on operation
  const outExt = operation === 'pdf-to-word' ? '.docx' : '.pdf';
  const outputPath = path.join(tempDir, `${jobId}_output${outExt}`);

  await fs.writeFile(inputPath, Buffer.from(fileBuffer));

  jobs.set(jobId, { status: 'processing', error: null, downloadUrl: null, outputPath });

  // Fire and forget the worker
  runWorker(jobId, inputPath, outputPath, operation);

  return jobId;
}

export function getJobStatus(jobId) {
  return jobs.get(jobId);
}

// lib/conversionWorker.js (Update the runWorker function)

async function runWorker(jobId, inputPath, outputPath, operation, options = {}) {
  try {
    if (operation === 'pdf-to-word') {
      let currentInput = inputPath;

      // 1. Run OCR if requested and document is scanned
      if (options.ocr === 'true') {
        const lang = options.language || 'eng';
        const ocrPath = path.join(path.dirname(inputPath), `${jobId}_ocr.pdf`);
        // Force OCR creates a searchable text layer over the images
        await execAsync(`ocrmypdf --force-ocr -l ${lang} "${currentInput}" "${ocrPath}"`);
        currentInput = ocrPath; // Pass the newly text-layered PDF to pdf2docx
      }

      // 2. Convert to Word
      await execAsync(`python3 -c "from pdf2docx import Converter; cv = Converter('${currentInput}'); cv.convert('${outputPath}', start=0, end=None); cv.close()"`);
      
      // Cleanup intermediate OCR file if it was created
      if (currentInput !== inputPath) await fs.unlink(currentInput).catch(() => {});
    } 
    else if (operation === 'word-to-pdf') {
      const outDir = path.dirname(outputPath);
      await execAsync(`soffice --headless --convert-to pdf --outdir "${outDir}" "${inputPath}"`);
      const parsedInput = path.parse(inputPath);
      const libreOfficeOutput = path.join(outDir, `${parsedInput.name}.pdf`);
      await fs.rename(libreOfficeOutput, outputPath);
    }

    await fs.unlink(inputPath).catch(() => {});

    const job = jobs.get(jobId);
    if (job) {
      job.status = 'completed';
      job.downloadUrl = `/api/download/${jobId}`;
    }
  } catch (error) {
    console.error(`Job ${jobId} failed:`, error);
    const job = jobs.get(jobId);
    if (job) {
      job.status = 'failed';
      job.error = 'Conversion failed. The document may be corrupted or too complex.';
    }
    await fs.unlink(inputPath).catch(() => {});
  }
}