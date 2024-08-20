import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Consulta SQL para obter dados da tabela 'primaryslide'
    const sqlQuery = 'SELECT idYoutube, catalog, background, creators FROM networkstructure';
    
    // Executa a consulta no banco de dados
    const rows = await query(sqlQuery, []);
    
    // Retorna a resposta com os dados em formato JSON
    return NextResponse.json(rows);
  } catch (error) {
    // Registra o erro no console
    console.error('Error fetching top videos:', error);
    
    // Retorna uma resposta de erro
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
