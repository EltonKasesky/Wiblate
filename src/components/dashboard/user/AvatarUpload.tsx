'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import FeedbackModalDashboard from '../FeedbackModalDashboard';

export default function AvatarUpload() {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0])); // Preview da imagem
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
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6 h-full w-full bg-white dark:bg-box-bg-dark rounded-lg">
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 w-40 h-40 rounded-full overflow-hidden relative hover:cursor-pointer hover:border-main-color transition-colors duration-300"
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 dark:text-white">
              <i className='bx bx-upload text-4xl'></i>
              <span className="mt-2 text-sm">Selecione seu avatar</span>
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            style={{
              clipPath: 'circle(50% at 50% 50%)',
            }}
          />
        </div>

        <button
          type="submit"
          className="flex justify-center w-40 rounded-md bg-main-color-light px-4 py-2 text-sm font-medium text-white hover:bg-main-color transition-transform duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color focus-visible:ring-offset-2"
        >
          Atualizar Avatar
        </button>
      </form>

      <FeedbackModalDashboard
        isOpen={isModalOpen}
        closeModal={closeModal}
        feedbackMessage={feedbackMessage}
      />
    </>
  );
}