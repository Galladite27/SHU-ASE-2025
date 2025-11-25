import { NextResponse } from 'next/server';
import {getSummaryMetrics } from '@/lib/getSummaryMetrics';

export async function SET() {
  const rows = getSummaryMetrics();
  return NextResponse.json(rows);
}
