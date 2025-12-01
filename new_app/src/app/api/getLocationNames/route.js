import { NextResponse } from 'next/server';
import { getLocationNames } from '@/lib/getLocations';

export async function GET() {
  const rows = getLocationNames();
  return NextResponse.json(rows);
}
