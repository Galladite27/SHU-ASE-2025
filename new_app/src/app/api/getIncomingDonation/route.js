import { NextResponse } from 'next/server';
import { getIncoming } from '@/lib/getIncomingDonation';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId } = getAuth(req);
  const rows = getIncoming(userId);
  return NextResponse.json(rows);
}
