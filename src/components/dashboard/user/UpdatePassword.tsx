'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import FeedbackModaDashboard from '../FeedbackModalDashboard';
import { useSession } from 'next-auth/react';

export default function UpdatePassword() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setFeedbackMessage('Erro: As novas senhas não coincidem.');
      setIsModalOpen(true);
      return;
    }
    else {
      try {
        const res = await fetch(`/api/dashboard/user/[${session?.user?.id}]/newPassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        });

        if (!res.ok) {
          setFeedbackMessage('Erro ao atualizar a senha. Tente novamente.');
        } else {
          setFeedbackMessage('Senha atualizada com sucesso!');
        }
      } catch (error) {
        setFeedbackMessage('Erro ao atualizar a senha. Tente novamente.');
      } finally {
        setIsModalOpen(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-6 h-full w-full bg-white rounded-lg p-4 overflow-y-auto"
      >
        <input
          type="password"
          placeholder="Senha atual"
          value={currentPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          required
        />

        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          required
        />

        <input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmNewPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          required
        />

        <button
          type="submit"
          className="w-full rounded-md bg-main-color px-4 py-2 text-sm font-medium text-white hover:bg-main-color-dark transition-transform duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-main-color focus-visible:ring-offset-2"
        >
          Atualizar Senha
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