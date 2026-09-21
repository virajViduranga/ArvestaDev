import { NextResponse } from 'next/server';
import { createJob } from '@/lib/conversionWorker';
import crypto from 'crypto';

// Simple in-memory rate limiter (For production, Redis is better)
const rateLimitCache = new Map();
const MAX_REQUESTS_PER_MINUTE = 5;
const MAX_FILE_SIZE_MB = 20; // Server limit

export async function POST(request) {
  try {
    // 1. Rate Limiting based on IP
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const userLimit = rateLimitCache.get(ip) || { count: 0, startTime: now };

    if (now - userLimit.startTime > 60000) {
      userLimit.count = 1;
      userLimit.startTime = now;
    } else {
      userLimit.count++;
      if (userLimit.count > MAX_REQUESTS_PER_MINUTE) {
        return NextResponse.json({ error: 'Too many conversions requested. Please wait a minute and try again.' }, { status: 429 });
      }
    }
    rateLimitCache.set(ip, userLimit);

    // 2. Parse Request
    const formData = await request.formData();
    const file = formData.get('file');
    const operation = formData.get('operation');
    const ocr = formData.get('ocr');
    const language = formData.get('language');

    if (!file || !operation) {
      return NextResponse.json({ error: 'File and operation are required.' }, { status: 400 });
    }

    // 3. Security: File Size Validation
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      return NextResponse.json({ error: `File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.` }, { status: 413 });
    }

    // 4. Security: Filename Sanitization (Prevent Path Traversal)
    // Completely ignore the user's filename and generate a safe one
    const safeExtension = file.name.split('.').pop().replace(/[^a-zA-Z0-9]/g, '');
    const safeFilename = `${crypto.randomUUID()}.${safeExtension}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const options = {
      ocr: ocr === 'true' ? 'true' : 'false',
      language: language || 'eng'
    };

    // Pass the sanitized safeFilename instead of the raw file.name
    const jobId = await createJob(buffer, safeFilename, operation, options);

    return NextResponse.json({ jobId, status: 'processing' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error processing your request.' }, { status: 500 });
  }
}