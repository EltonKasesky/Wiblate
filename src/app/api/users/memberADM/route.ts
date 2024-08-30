import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const results = await query(
      'SELECT id, name, email, cargo FROM Users WHERE cargo IN ($1, $2, $3)',
      ['Membro', 'Produtor', 'Gerenciador']
    );
    return NextResponse.json(results);
  } catch (error) {
    console.error('Failed to fetch members:', error); // Adicione logging para depuração
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}
