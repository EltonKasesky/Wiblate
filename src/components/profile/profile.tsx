'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Check, X } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

interface Profile {
  id: string;
  profile_name: string;
  profile_picture: string | null;
}

const ProfilePage = () => {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProfileName, setNewProfileName] = useState('');
  const [showAddProfile, setShowAddProfile] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('/api/profiles/GET/');
        setProfiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar perfis', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleSelectProfile = (profileId: string) => {
    localStorage.setItem('selectedProfileId', profileId);
    console.log(profileId)
    router.push(`/`);
  };

  const handleAddProfile = () => {
    setShowAddProfile(true);
  };

  const handleSaveProfile = async () => {
    if (newProfileName.trim() === '') {
      alert('Por favor, insira um nome para o perfil.');
      return;
    }

    try {
      const profileId = uuidv4();
      const newProfile = {
        id: profileId,
        profile_name: newProfileName,
        profile_picture: null,
      };

      const response = await axios.post('/api/profiles/POST/', newProfile);
      setProfiles([...profiles, response.data]);
      setNewProfileName('');
      setShowAddProfile(false);
    } catch (error) {
      console.error('Erro ao adicionar perfil', error);
    }
  };

  const handleCancelProfile = () => {
    setNewProfileName('');
    setShowAddProfile(false);
  };

  const decodeBase64Image = (base64: string) => {
    return `data:image/jpeg;base64,${base64}`;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Escolha seu perfil</h1>
      <div className="flex flex-col items-center">
        <div className="flex gap-4 mb-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              onClick={() => handleSelectProfile(profile.id)} 
              className="cursor-pointer p-4 border rounded-lg text-center w-32 h-40 bg-white dark:bg-gray-800 shadow-lg dark:shadow-none transition-transform hover:scale-105"
            >
              <Image
                src={profile.profile_picture ? decodeBase64Image(profile.profile_picture) : 'https://github.com/shadcn.png'}
                alt={profile.profile_name}
                width={100}
                height={100}
                className="rounded-full object-cover w-24 h-24"
              />
              <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{profile.profile_name}</p>
            </div>
          ))}

          {profiles.length < 3 && !showAddProfile && (
            <div
              onClick={handleAddProfile}
              className="flex items-center justify-center w-32 h-40 bg-gray-300 dark:bg-gray-600 rounded-lg cursor-pointer transition-transform hover:scale-105"
            >
              <Plus className="w-10 h-10 text-gray-900 dark:text-gray-100" />
            </div>
          )}

          {showAddProfile && (
            <div className="cursor-default p-4 border rounded-lg text-center w-32 h-40 bg-white dark:bg-gray-800 shadow-lg dark:shadow-none">
              <Image
                src="https://github.com/shadcn.png" 
                alt="Novo perfil"
                width={100}
                height={100}
                className="rounded-full"
              />
              <input
                type="text"
                placeholder="Nome "
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="mt-2 p-2 text-center font-semibold text-lg w-full bg-transparent border-b focus:outline-none text-gray-900 dark:text-gray-100"
              />
            </div>
          )}
        </div>

        {showAddProfile && (
          <div className="flex gap-4 mt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="group">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full group-hover:bg-green-500 transition-colors duration-150"
                  >
                    <Check className="text-xl text-black dark:text-white group-hover:text-white" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="w-max" side="top" align="center">
                  Criar perfil
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger className="group">
                  <button
                    onClick={handleCancelProfile}
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full group-hover:bg-red-500 transition-colors duration-150"
                  >
                    <X className="text-xl text-black dark:text-white group-hover:text-white" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="w-max" side="top" align="center">
                  Cancelar novo perfil
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
