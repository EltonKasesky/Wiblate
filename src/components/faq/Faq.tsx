import React from 'react';
import Link from 'next/link';
import BackButtonTermsPrivacy from '../ui/BackButtonTermsPrivacy';

export default function FAQ() {
  return (
    <section className="flex flex-col justify-center items-center text-left mt-12 w-full antialiased">
        <BackButtonTermsPrivacy />
        <div className='flex flex-col items-start max-w-7xl px-4 py-28 faq:py-10'>
            <h1 className="text-2xl font-bold mb-4">Perguntas Frequentes (FAQ)</h1>

            <h2 className="text-xl font-semibold mt-6 mb-4">1. O que é o RoyalTV?</h2>
            <p>
                O RoyalTV é uma plataforma de streaming que oferece uma ampla gama de conteúdos audiovisuais, incluindo filmes, séries e eventos ao vivo. Nosso foco é proporcionar entretenimento de alta qualidade para os moradores de Petrópolis.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">2. Como posso me cadastrar no RoyalTV?</h2>
            <p>
                Para se cadastrar no RoyalTV, clique no botão "Cadastrar" no topo da página e siga os passos indicados. Você precisará fornecer informações básicas como nome, e-mail e criar uma senha. Após o cadastro, você terá acesso aos conteúdos disponíveis.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">3. Como posso recuperar minha senha?</h2>
            <p>
                Caso tenha esquecido sua senha, clique em "Esqueci minha senha" na página de login. Um e-mail será enviado com instruções para redefinir sua senha.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">4. Qual a política de privacidade do RoyalTV?</h2>
            <p>
                A privacidade dos nossos usuários é de extrema importância para nós. Consulte nossa <Link href="/privacy" className="text-blue-500 hover:underline">Política de Privacidade</Link> para saber mais sobre como lidamos com seus dados.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">5. Onde posso encontrar os Termos de Uso?</h2>
            <p>
                Nossos Termos de Uso estão disponíveis na página <Link href="/terms" className="text-blue-500 hover:underline">Termos de Uso</Link>. Recomendamos que todos os usuários leiam com atenção para entender as regras e diretrizes de uso da plataforma.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">6. Como entro em contato com o suporte?</h2>
            <p>
                Você pode entrar em contato com nosso suporte através do <Link href="/contact" className="text-blue-500 hover:underline">formulário de contato</Link> ou pelo e-mail suporte@royaltv.com. Estamos disponíveis para ajudá-lo com qualquer dúvida ou problema.
            </p>

            <p className="mt-6">
                Esta FAQ é atualizada periodicamente para garantir que contenha as informações mais recentes. Última atualização em <strong>12 de Setembro de 2024.</strong>
            </p>
        </div>
    </section>
  );
}