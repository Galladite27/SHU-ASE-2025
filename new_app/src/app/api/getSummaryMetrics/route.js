import { NextResponse } from 'next/server';
import { getHistory,getSummaryMetrics } from '@/lib/getSummaryMetrics';

export async function GET() {
  const rows = getSummaryMetrics();
  return NextResponse.json(rows);
}
