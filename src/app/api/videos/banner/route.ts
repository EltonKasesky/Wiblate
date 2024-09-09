import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const sqlQuery = 'SELECT catalog FROM banner';
    
    const rows = await query(sqlQuery, []);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching banner images:', error);
    
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
