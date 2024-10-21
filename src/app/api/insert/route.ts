import { query } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const { select, idYoutube, creators, catalog, background } = await req.json();

    if (!select || !idYoutube || !creators || !catalog || !background) {
      return new Response(JSON.stringify({ message: 'Todos os campos são obrigatórios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let tableName: string;

    switch (select) {
      case 'banner':
        tableName = 'banner';
        break;
      case 'logic':
        tableName = 'logic';
        break;
      case 'databank':
        tableName = 'databank';
        break;
      case 'networkstructure':
        tableName = 'networkstructure';
        break;
      case 'hardware':
        tableName = 'hardware';
        case 'filmes':
        tableName = 'movies';
        break;
      default:
        return new Response(JSON.stringify({ message: 'Tabela inválida selecionada' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    const insertQuery = `
      INSERT INTO ${tableName} (idyoutube, creators, catalog, background)
      VALUES ($1, $2, $3, $4)
    `;

    await query(insertQuery, [idYoutube, creators, catalog, background]);

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
