import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'; // Substitua pelo caminho correto do seu componente de Card
import LoadingSkeleton from '@/components/LoadingSkeleton'; // Substitua pelo caminho correto do seu componente de LoadingSkeleton

interface Member {
  id: string;
  name: string;
  email: string;
  cargo: string;
}

interface UpdatedCargos {
  [id: string]: string;
}

const Members = () => {
  const { data: session } = useSession();
  const userCargo = session?.user?.cargo;
  const [members, setMembers] = useState<Member[]>([]);
  const [updatedCargos, setUpdatedCargos] = useState<UpdatedCargos>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const membersPerPage = 12;

  useEffect(() => {
    if (userCargo === undefined) {
      console.error('User cargo is not defined');
      return;
    }

    const fetchMembers = async () => {
      try {
        const endpoint =
          userCargo === 'Administrador'
            ? '/api/users/memberADM'
            : '/api/users/members';

        const response = await axios.get(endpoint);
        setMembers(response.data);
        setLoading(false); // Definindo loading como falso após carregar os dados
      } catch (error) {
        console.error('Failed to fetch members', error);
      }
    };

    fetchMembers();
  }, [userCargo]);

  const handleCargoChange = (id: string, cargo: string) => {
    setUpdatedCargos((prev) => ({ ...prev, [id]: cargo }));
  };

  const handleSave = async () => {
    try {
      const updates = Object.entries(updatedCargos).map(([id, cargo]) =>
        axios.post('/api/users/update', { id, cargo })
      );
      await Promise.all(updates);
      alert('Cargos updated successfully');
    } catch (error) {
      console.error('Failed to update cargos', error);
      alert('Failed to update cargos');
    }
  };

  // Paginação
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container pt-24 pb-16 mx-auto px-2 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Members List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: membersPerPage }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          : currentMembers.map((member) => (
              <Card key={member.id} className="p-4">
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <select
                    value={updatedCargos[member.id] || member.cargo}
                    onChange={(e) => handleCargoChange(member.id, e.target.value)}
                    className="bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full text-black"
                  >
                    <option value="Membro">Membro</option>
                    <option value="Produtor">Produtor</option>
                    <option value="Gerenciador">Gerenciador</option>
                  </select>
                </CardContent>
              </Card>
            ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination */}
        <div>
          {Array.from({ length: Math.ceil(members.length / membersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 py-2 px-4 rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              } hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Members;
