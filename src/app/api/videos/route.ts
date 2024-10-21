import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const select = searchParams.get('select');

  if (!select) {
    return NextResponse.json({ error: 'Select parameter is required' }, { status: 400 });
  }

  let tableName = '';

  switch (select) {
    case 'banner':
      tableName = 'banner';
      break;
    case 'logic':
      tableName = 'logic';
      break;
    case 'databank':
      tableName = 'databank';
      break;
    case 'networkstructure':
      tableName = 'networkstructure';
      break;
    case 'hardware':
      tableName = 'hardware';
      break;
      case 'movies':
      tableName = 'movies';
      break;
    default:
      return NextResponse.json({ error: 'Tabela inválida selecionada' }, { status: 400 });
  }

  try {
    const sqlQuery = `SELECT idYoutube, catalog FROM ${tableName}`;
    const rows = await query(sqlQuery, []);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
