const express = require('express');
const multer = require('multer');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const app = express();

// Allow your Cloudflare frontend to access this API
app.use(cors({ origin: ['http://localhost:3000', 'https://arvestadev.com'] }));

// --- SECURITY & LIMITS ---
const rateLimitCache = new Map();
const MAX_REQUESTS_PER_MINUTE = 5;
const MAX_FILE_SIZE_MB = 20;

// Multer handles the file upload and size limit automatically
const upload = multer({ 
  dest: os.tmpdir(),
  limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 }
});

// --- JOB QUEUE ---
const jobs = new Map();

async function runWorker(jobId, inputPath, operation, options) {
  const outputPath = path.join(os.tmpdir(), `${jobId}_output${operation === 'pdf-to-word' ? '.docx' : '.pdf'}`);
  
  try {
    if (operation === 'pdf-to-word') {
      let currentInput = inputPath;
      if (options.ocr === 'true') {
        const ocrPath = path.join(os.tmpdir(), `${jobId}_ocr.pdf`);
        await execAsync(`ocrmypdf --force-ocr -l ${options.language} "${currentInput}" "${ocrPath}"`);
        currentInput = ocrPath;
      }
      await execAsync(`python3 -c "from pdf2docx import Converter; cv = Converter('${currentInput}'); cv.convert('${outputPath}', start=0, end=None); cv.close()"`);
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
      job.outputPath = outputPath;
      job.downloadUrl = `/api/download/${jobId}`;
    }
  } catch (error) {
    console.error(`Job ${jobId} failed:`, error);
    const job = jobs.get(jobId);
    if (job) {
      job.status = 'failed';
      job.error = 'Conversion failed.';
    }
    await fs.unlink(inputPath).catch(() => {});
  }
}

// --- ROUTE 1: CREATE JOB (Formerly POST /api/convert) ---
app.post('/api/convert', (req, res, next) => {
  // Rate Limiting
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const userLimit = rateLimitCache.get(ip) || { count: 0, startTime: now };

  if (now - userLimit.startTime > 60000) {
    userLimit.count = 1;
    userLimit.startTime = now;
  } else {
    userLimit.count++;
    if (userLimit.count > MAX_REQUESTS_PER_MINUTE) {
      return res.status(429).json({ error: 'Too many conversions requested. Please wait a minute.' });
    }
  }
  rateLimitCache.set(ip, userLimit);
  next();
}, upload.single('file'), async (req, res) => {
  if (!req.file || !req.body.operation) {
    return res.status(400).json({ error: 'File and operation are required.' });
  }

  const jobId = crypto.randomUUID();
  jobs.set(jobId, { status: 'processing', error: null, downloadUrl: null, outputPath: null });

  // Start background worker
  runWorker(jobId, req.file.path, req.body.operation, {
    ocr: req.body.ocr || 'false',
    language: req.body.language || 'eng'
  });

  res.json({ jobId, status: 'processing' });
});

// --- ROUTE 2: POLL STATUS (Formerly GET /api/jobs/[id]) ---
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// --- ROUTE 3: DOWNLOAD & CLEANUP (Formerly GET /api/download/[id]) ---
app.get('/api/download/:id', async (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job || job.status !== 'completed' || !job.outputPath) {
    return res.status(404).send('File not found or expired.');
  }

  try {
    const filename = job.outputPath.endsWith('.docx') ? 'converted-document.docx' : 'converted-document.pdf';
    
    // Express res.download handles the headers and stream automatically
    res.download(job.outputPath, filename, async (err) => {
      // Delete the file immediately after sending it to the user
      await fs.unlink(job.outputPath).catch(console.error);
      job.outputPath = null; 
    });
  } catch (error) {
    res.status(500).send('Failed to read file.');
  }
});

app.listen(8080, () => {
  console.log('PDF Conversion API running on port 8080');
});