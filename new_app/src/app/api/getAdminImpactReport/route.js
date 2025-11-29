import { NextResponse } from 'next/server';
import { getAdminReport } from '@/lib/getAdminImpactReport';

export async function GET() {
  const rows = getAdminReport();
  return NextResponse.json(rows);
}
