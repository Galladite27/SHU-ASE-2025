import { NextResponse } from 'next/server';
import { getDonationCount } from '@/lib/getDonorsInfo';

export async function GET() {
  console.log("hello")
  const rows = getDonationCount();
  return NextResponse.json(rows);
}
