import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idYoutube = searchParams.get('idYoutube');
  const tableName = searchParams.get('tableName');

  
  if (!idYoutube || !tableName) {
    return NextResponse.json({ error: 'idYoutube and tableName are required' }, { status: 400 });
  }

  
  const allowedTables = ['logic', 'databank', 'hardware', 'networkstructure']; 
  if (!allowedTables.includes(tableName)) {
    return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
  }

  try {
    
    const sqlQuery = `SELECT background, creators FROM ${tableName} WHERE idYoutube = $1`;
    const rows = await query(sqlQuery, [idYoutube]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const { background, creators } = rows[0];

    
    return NextResponse.json({ background, creators });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
