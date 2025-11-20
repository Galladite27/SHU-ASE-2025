import { NextResponse } from 'next/server';
import { getAllCharityInfo } from '@/lib/getCharityInfo';

export async function GET() {
  const rows = getAllCharityInfo();
  return NextResponse.json(rows);
}
