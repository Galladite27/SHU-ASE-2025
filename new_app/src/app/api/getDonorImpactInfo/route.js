import { NextResponse } from 'next/server';
import { getDonorImpact } from '@/lib/getDonorImpactReport';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId } = getAuth(req);
  const rows = getDonorImpact(userId);
  return NextResponse.json(rows);
}
