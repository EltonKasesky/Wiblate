import { query } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const { gender, idYoutube, companyName, address, phone, city, state, logo, message, catalog, instagram, ifood } = await req.json();
    
    let Blogo = true;
    let Bcatalog = true;

    if(!logo || !catalog){
      Blogo = false
      Bcatalog = false
    }

    console.log('Dados recebidos:', { gender, idYoutube, companyName, address, phone, city, state, Blogo, message, Bcatalog, instagram, ifood });

    if (!gender || !idYoutube || !companyName || !city || !state || !logo || !message || !catalog) {
      return new Response(JSON.stringify({ message: 'Os campos com * são obrigatórios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let insertQuery: string;
    let queryParams: any[] = [companyName, address, phone, city, state, logo, idYoutube, message, catalog, instagram, ifood];

    switch (gender) {
      case 'eventos':
        insertQuery = `
          INSERT INTO events (company_name, address, phone, city, state, logo, id_youtube, description, catalog, instagram)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        break;
      case 'gastronomia':
        insertQuery = `
          INSERT INTO gastronomy (company_name, address, phone, city, state, logo, id_youtube, description, catalog, instagram, ifood)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
        break;
      case 'noticias':
        insertQuery = `
          INSERT INTO news (company_name, address, phone, city, state, logo, id_youtube, description, catalog, instagram)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        break;
      case 'conhecaacidade':
        insertQuery = `
          INSERT INTO know (company_name, address, phone, city, state, logo, id_youtube, description, catalog, instagram)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        break;
      default:
        return new Response(JSON.stringify({ message: 'Opção inválida selecionada' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }


await query(insertQuery, queryParams); 




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
