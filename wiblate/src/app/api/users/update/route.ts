import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const { id, cargo } = await req.json();

    if (!id || !cargo) {
      return NextResponse.json({ error: 'ID and cargo are required' }, { status: 400 });
    }

    await query(
      'UPDATE users SET cargo = $1 WHERE id = $2',
      [cargo, id]
    );

    return NextResponse.json({ message: 'Cargo updated successfully' });
  } catch (error) {
    console.error('Failed to update cargo:', error); // Logging for debugging
    return NextResponse.json({ error: 'Failed to update cargo' }, { status: 500 });
  }
}
