import { NextResponse } from 'next/server';
import { getIncoming } from '@/lib/getIncomingDonation';

export async function GET() {
  const rows = getIncoming();
  return NextResponse.json(rows);
}
