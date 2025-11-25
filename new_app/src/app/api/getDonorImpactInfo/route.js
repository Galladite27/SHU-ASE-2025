import { NextResponse } from 'next/server';
import { getDonorImpact } from '@/lib/getDonorImpactReport';

export async function GET() {
  const rows = getDonorImpact();
  return NextResponse.json(rows);
}
