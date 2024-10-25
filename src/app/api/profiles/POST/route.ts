// src/app/api/profiles/addProfile.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Usuário não autenticado.' }, { status: 403 });
    }

    const user_id = session.user.id;

    const { id, profile_name } = await request.json();

    const profile_picture = ''

    try {
        await query(
            'INSERT INTO profiles (id, user_id, profile_name, profile_picture) VALUES ($1, $2, $3, $4)',
            [id, user_id, profile_name, profile_picture]
        );

        const createdProfile = await query('SELECT * FROM profiles WHERE id = $1', [id]);

        return NextResponse.json(createdProfile[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar perfil' }, { status: 500 });
    }
}
