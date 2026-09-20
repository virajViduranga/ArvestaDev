import { NextResponse } from 'next/server';
import { createJob } from '@/lib/conversionWorker';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const operation = formData.get('operation');
    
    // 1. Extract the options sent from the frontend
    const ocr = formData.get('ocr');
    const language = formData.get('language');

    if (!file || !operation) {
      return NextResponse.json({ error: 'File and operation are required.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Package them into an options object
    const options = {
      ocr: ocr === 'true' ? 'true' : 'false',
      language: language || 'eng'
    };

    // 3. Pass the options object to your worker
    const jobId = await createJob(buffer, file.name, operation, options);

    return NextResponse.json({ jobId, status: 'processing' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}