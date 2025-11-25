import { NextResponse } from 'next/server';
import { getStock } from '@/lib/getStockLevel';

export async function GET() {
  const rows = getStock();
  return NextResponse.json(rows);
}
