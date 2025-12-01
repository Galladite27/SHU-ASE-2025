import { NextResponse } from 'next/server';
import { getStock } from '@/lib/getClothingStock';
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId } = getAuth(req);
  const rows = getStock(userId);
  return NextResponse.json(rows);
}
