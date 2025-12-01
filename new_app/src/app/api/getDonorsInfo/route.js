import { NextResponse } from 'next/server';
import { getDonationCount } from '@/lib/getDonorsInfo';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId } = getAuth(req);
  const rows = getDonationCount(userId);
  
  return NextResponse.json(rows);
}
