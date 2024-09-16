import { query } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const { gender, idYoutube, companyName, address, phone, city, state, logo, message, catalog } = await req.json();
    
    // Adicione logs para depuração
    console.log('Dados recebidos:', { gender, idYoutube, companyName, address, phone, city, state, logo, message, catalog });

    if (!gender || !idYoutube || !companyName || !address || !phone || !city || !state || !logo || !message || !catalog) {
      return new Response(JSON.stringify({ message: 'Todos os campos são obrigatórios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let tableName: string;
    switch (gender) {
      case 'eventos':
        tableName = 'events';
        break;
      case 'gastronomia':
        tableName = 'gastronomy';
        break;
      case 'turismo':
        tableName = 'news';
        break;
      case 'conhecaacidade':
        tableName = 'know';
        break;
      default:
        return new Response(JSON.stringify({ message: 'Opção inválida selecionada' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    const insertQuery = `
      INSERT INTO ${tableName} (company_name, address, phone, city, state, logo, id_youtube, description, catalog)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    
    await query(insertQuery, [companyName, address, phone, city, state, logo, idYoutube, message, catalog]);

    return new Response(JSON.stringify({ message: 'Dados inseridos com sucesso' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao inserir dados no banco de dados:', error);
    return new Response(JSON.stringify({ message: 'Erro ao inserir dados no banco de dados' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};