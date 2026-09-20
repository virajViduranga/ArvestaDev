import { NextResponse } from 'next/server';
import { getJobStatus } from '@/lib/conversionWorker';

export async function GET(request, { params }) {
 const resolvedParams = await params; 
  const jobId = resolvedParams.id;
  const job = getJobStatus(jobId);

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json(job);
}