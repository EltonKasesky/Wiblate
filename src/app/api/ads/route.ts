// app/api/ads/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Ajuste o caminho conforme necessário

// Função para buscar informações de anúncios com base na cidade
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const city = url.searchParams.get('city');

    if (!city) {
      return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
    }

    // Consulta para buscar todas as informações de anúncios
    const results = await query(`
      SELECT id, company_name, address, phone, city, state, description, id_youtube, logo
      FROM eventos WHERE city = $1
      UNION ALL
      SELECT id, company_name, address, phone, city, state, description, id_youtube, logo
      FROM turismo WHERE city = $1
      UNION ALL
      SELECT id, company_name, address, phone, city, state, description, id_youtube, logo
      FROM gastronomia WHERE city = $1
      UNION ALL
      SELECT id, company_name, address, phone, city, state, description, id_youtube, logo
      FROM conheca_cidade WHERE city = $1
    `, [city]);

    // Retornar os resultados da consulta
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching ad data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
