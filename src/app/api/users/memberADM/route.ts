import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  try {
    const results = await query(
      `SELECT id, name, email, cargo 
       FROM Users 
       WHERE cargo IN ($1, $2, $3)
       AND (LOWER(name) LIKE $4 OR LOWER(email) LIKE $5)`,
      ['Membro', 'Produtor', 'Gerenciador', `%${searchQuery}%`, `%${searchQuery}%`]
    );
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}
