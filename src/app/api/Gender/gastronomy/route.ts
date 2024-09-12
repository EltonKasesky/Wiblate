import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || '';
    const state = searchParams.get('state') || '';

    let sqlQuery = 'SELECT id, company_name, address, phone, city, state, description, id_youtube, logo, catalog FROM gastronomia WHERE city = $1';
    let rows = await query(sqlQuery, [city]);

    if (rows.length === 0 && state) {
      sqlQuery = 'SELECT id, company_name, address, phone, city, state, description, id_youtube, logo, catalog FROM gastronomia WHERE state = $1';
      rows = await query(sqlQuery, [state]);
    }

    if (rows.length === 0) {
      sqlQuery = 'SELECT id, company_name, address, phone, city, state, description, id_youtube, logo, catalog FROM gastronomia LIMIT 10';
      rows = await query(sqlQuery, []);
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
