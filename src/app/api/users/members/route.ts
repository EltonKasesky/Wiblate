import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    // Atualizar a consulta SQL para buscar por "Membro" ou "Produtor"
    const results = await query(
      'SELECT id, name, email, cargo FROM Users WHERE cargo IN ($1, $2)',
      ['Membro', 'Produtor']
    );
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}
