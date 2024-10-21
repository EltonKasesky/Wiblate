import { useEffect, useState } from 'react';
import axios from 'axios';
import { Cpu, Database, Server, Film, PcCase } from 'lucide-react'; 

interface Category {
  category: string;
  views_count: number;
}

export default function UserWatchedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  
  const categoryIcons: { [key: string]: JSX.Element } = {
    logic: <Cpu className="w-10 h-10 text-gray-900 dark:text-white" />,
    databank: <Database className="w-10 h-10 text-gray-900 dark:text-white" />,
    networkstructure: <Server className="w-10 h-10 text-gray-900 dark:text-white" />,
    movies: <Film className="w-10 h-10 text-gray-900 dark:text-white" />,
    hardware: <PcCase className="w-10 h-10 text-gray-900 dark:text-white" />,
  };

  
  const categoryNames: { [key: string]: string } = {
    logic: 'Lógica de Programação',
    databank: 'Banco de Dados',
    networkstructure: 'Estrutura de Redes',
    movies: 'Filmes',
    hardware: 'Hardware',
  };

  useEffect(() => {
    const fetchWatchedCategories = async () => {
      try {
        const { data } = await axios.get('/api/videos/category/getWatched/');
        setCategories(data);
      } catch (error) {
        console.error('Erro ao buscar categorias assistidas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchedCategories();
  }, []);

  return (
    <section className="box-border p-6 bg-white dark:bg-box-bg-dark shadow-lg rounded-lg h-auto flex flex-col justify-between max-w-full lg:max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
        Categorias Mais Assistidas
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
        {loading ? (
          <p>Carregando...</p>
        ) : categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full shadow-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                {/* Exibe o ícone correspondente à categoria */}
                {categoryIcons[category.category] || <Cpu className="w-10 h-10 text-gray-900 dark:text-white" />}
              </div>
              {/* Exibe o nome completo da categoria */}
              <p className="mt-2 text-gray-900 dark:text-white capitalize">
                {categoryNames[category.category] || category.category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{category.views_count} vídeos</p>
            </div>
          ))
        ) : (
          <p>Nenhuma categoria assistida.</p>
        )}
      </div>
    </section>
  );
}
