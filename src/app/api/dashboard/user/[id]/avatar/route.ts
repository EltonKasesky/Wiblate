import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    const formData = await request.formData();
    const avatarFile = formData.get('avatar') as Blob;

    if (!avatarFile) {
      return NextResponse.json({ error: 'No avatar file provided' }, { status: 400 });
    }

    // Convert the file to base64
    const buffer = Buffer.from(await avatarFile.arrayBuffer());
    const avatarBase64 = buffer.toString('base64');

    const client = await pool.connect();
    await client.query('UPDATE users SET avatar = $1 WHERE id = $2', [avatarBase64, userId]);
    client.release();

    return NextResponse.json({ message: 'Avatar updated successfully' });
  } catch (error) {
    console.error('Error updating avatar:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
