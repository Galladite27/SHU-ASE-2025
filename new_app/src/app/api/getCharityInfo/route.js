import { NextResponse } from 'next/server';
import { getAllCharityInfo } from '@/lib/getCharityInfo';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId } = getAuth(req);
  const rows = getAllCharityInfo(userId);
  return NextResponse.json(rows);
}
