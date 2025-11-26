import { NextResponse } from 'next/server';
import { getDonationCount } from '@/lib/getDonorsInfo';

export async function GET() {
  const rows = getDonationCount();
  return NextResponse.json(rows);
}
