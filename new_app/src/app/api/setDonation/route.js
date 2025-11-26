import { NextResponse } from 'next/server';
import { setDonations } from '@/lib/setDonation';

export async function SET() {
  const rows = setDonations();
  return NextResponse.json(rows);
}
