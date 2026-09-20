import { NextResponse } from 'next/server';
import { getJobStatus } from '@/lib/conversionWorker';
import fs from 'fs/promises';
import { createReadStream } from 'fs';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const jobId = resolvedParams.id;
  const job = getJobStatus(jobId);

  if (!job || job.status !== 'completed' || !job.outputPath) {
    return new NextResponse('File not found or expired.', { status: 404 });
  }

  try {
    // Check if file still exists
    await fs.access(job.outputPath);

    // Read the file into memory (for small to medium PDFs)
    const fileBuffer = await fs.readFile(job.outputPath);

    // Setup headers for forced download
    const filename = job.outputPath.endsWith('.docx') ? 'converted-document.docx' : 'converted-document.pdf';
    const mimeType = job.outputPath.endsWith('.docx') 
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      : 'application/pdf';

    const response = new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': mimeType,
      },
    });

    // 🔒 PRIVACY REQUIREMENT: Delete the file immediately after sending it to memory
    await fs.unlink(job.outputPath).catch(console.error);
    job.outputPath = null; // Mark as deleted in queue

    return response;

  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Failed to read file.', { status: 500 });
  }
}