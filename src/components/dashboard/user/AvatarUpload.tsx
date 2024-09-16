'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import FeedbackModaDashboard from '../FeedbackModalDashboard';

export default function AvatarUpload() {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
  
    const formData = new FormData();
    formData.append('avatar', selectedFile);
  
    try {
      const res = await fetch(`/api/dashboard/user/${session?.user?.id}/avatar`, {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) {
        setFeedbackMessage('Erro ao atualizar o avatar. Tente novamente.');
      } else {
        setFeedbackMessage('Avatar atualizado com sucesso!');
      }
    } catch (error) {
      setFeedbackMessage('Erro ao atualizar o avatar. Tente novamente.');
    } finally {
      setIsModalOpen(true);
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          type="submit"
          className="flex justify-center w-40 rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Atualizar Avatar
        </button>
      </form>

      <FeedbackModaDashboard
        isOpen={isModalOpen}
        closeModal={closeModal}
        feedbackMessage={feedbackMessage}
      />
    </>
  );
}