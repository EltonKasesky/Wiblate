"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Briefcase } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

export default function About() {
    return (
        <div className="bg-body-bg-light dark:bg-body-bg-dark text-gray-900 dark:text-white min-h-screen mt-16">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold mb-4">Sobre Nós</h1>
                    <p className="text-xl text-gray-600 dark:text-white">
                        Nossa missão é transformar a educação através de vídeos inovadores e acessíveis para todos.
                    </p>
                </header>

                {/* Missão */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
                    <p className="text-lg leading-relaxed">
                        Desenvolver uma plataforma virtual inovadora para a Rede SENAI que facilite o armazenamento, a catalogação e o acesso a vídeos educativos.
                    </p>
                    <p className="text-lg leading-relaxed mt-4">
                        Nosso objetivo é contribuir para a excelência educacional, oferecendo uma ferramenta eficaz para a preparação dos alunos para o SAEP. Queremos melhorar os resultados individuais dos estudantes e, ao mesmo tempo, elevar o padrão educacional do SENAI como um todo. A plataforma proporciona acesso facilitado a materiais de estudo relevantes, reduzindo a dependência dos instrutores e garantindo maior autonomia para os alunos.
                    </p>
                    <p className="text-lg leading-relaxed mt-4">
                        Além disso, buscamos engajar os alunos, transformando a preparação para o SAEP em uma experiência dinâmica e envolvente. Queremos promover um aprendizado contínuo, permitindo que alunos destacados criem e compartilhem seus próprios conteúdos, contribuindo para o processo de aprendizagem de seus colegas e assumindo um papel de protagonismo dentro da plataforma.
                    </p>
                </section>

                {/* Equipe */}
                <TooltipProvider>
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold mb-4">Conheça a Equipe</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                            <div className="text-center">
                                <Image
                                    src="/images/about/team-member-1.png"
                                    alt="Pedro Henrique Cler"
                                    width={144}
                                    height={144}
                                    className="mx-auto rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold">Pedro Henrique Cler</h3>
                                <p className="text-gray-600 dark:text-gray-300">Backend</p>
                                <div className="mt-4 flex justify-center space-x-4">
                                    <Tooltip>
                                        <TooltipTrigger className="group">
                                            <Link
                                                href="https://github.com/P-Cler"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full group-hover:bg-main-color-light transition-colors duration-150"
                                            >
                                                <Github className="text-xl text-black dark:text-white group-hover:text-white" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="w-max" side="top" align="center">
                                            GitHub
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger className="group">
                                            <Link
                                                href="https://p-cler.github.io/PortfolioCler/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full group-hover:bg-main-color-light transition-colors duration-150"
                                            >
                                                <Briefcase className="text-xl text-black dark:text-white group-hover:text-white" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="w-max" side="top" align="center">
                                            Portfolio
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="text-center">
                                <Image
                                    src="/images/about/team-member-2.png"
                                    alt="Elton Kasesky"
                                    width={144}
                                    height={144}
                                    className="mx-auto rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold">Elton Kasesky</h3>
                                <p className="text-gray-600 dark:text-gray-300">Frontend</p>
                                <div className="mt-4 flex justify-center space-x-4">
                                    <Tooltip>
                                        <TooltipTrigger className="group">
                                            <Link
                                                href="https://github.com/seu-perfil"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full group-hover:bg-main-color-light transition-colors duration-300"
                                            >
                                                <Github className="text-xl text-black dark:text-white group-hover:text-white" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="w-max" side="top" align="center">
                                            GitHub
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger className="group">
                                            <Link
                                                href="https://www.linkedin.com/in/seu-perfil"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full group-hover:bg-main-color-light transition-colors duration-300"
                                            >
                                                <Briefcase className="text-xl text-black dark:text-white group-hover:text-white" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent className="w-max" side="top" align="center">
                                            Portfolio
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </section>
                </TooltipProvider>

                {/* Tecnologias */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-4">Tecnologias que Usamos</h2>
                    <p className="text-lg leading-relaxed">
                        Nossa plataforma é construída utilizando um conjunto de tecnologias avançadas para oferecer uma experiência de usuário excepcional. Utilizamos o <strong>PostgreSQL</strong>, um banco de dados relacional poderoso e de código aberto, que nos permite gerenciar dados de forma eficaz com alta confiabilidade e segurança. Para o desenvolvimento da aplicação web, adotamos o <strong>Next.js</strong>, um framework React que facilita a criação de aplicações rápidas e escaláveis, aproveitando recursos como renderização do lado do servidor e geração de sites estáticos para otimizar o desempenho.
                    </p>
                    <p className="text-lg leading-relaxed mt-4">
                        A biblioteca <strong>Skeleton</strong> é utilizada para estilizar nossa plataforma de maneira ágil e eficiente, proporcionando uma interface de usuário moderna e responsiva. Complementando nossa arquitetura, o <strong>NextAuth</strong> é empregado para gerenciar a autenticação de usuários, garantindo um sistema de login seguro e flexível. Com essas tecnologias, conseguimos desenvolver uma plataforma robusta e intuitiva, atendendo às necessidades dos nossos usuários e oferecendo uma experiência de aprendizado excepcional.
                    </p>
                </section>

                {/* Depoimentos */} 
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-4">O Que Nossos Usuários Dizem</h2>
                    <div className="space-y-8">
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-lg">
                            &quot;Projeto muito bem estruturado e de alto nível, tem muito futuro pela frente.&quot; <br />
                            — Arthur Giangiarulo <span className="font-bold text-purple-700">— Professor da rede FIRJAN SENAI</span>
                        </blockquote>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-lg">
                        &quot;É extremamente gratificante ver o impacto positivo que nosso projeto tem na vida dos alunos. Cada feedback positivo nos motiva a continuar trabalhando duro para oferecer o melhor suporte possível.&quot; <br />
                            — Pedro Cler <span className="font-bold text-purple-700">— Membro da equipe</span>
                        </blockquote>
                    </div>
                </section>



                {/* Futuro */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-4">Nosso Futuro</h2>
                    <p className="text-lg leading-relaxed">
                        O SAEPflix está comprometido com a evolução contínua para oferecer a melhor experiência de aprendizado possível. Em nossas próximas atualizações, planejamos implementar várias melhorias significativas. A primeira grande atualização introduzirá funções de playlist e mini-jogos ao final de cada conteúdo, proporcionando aos alunos uma forma divertida e interativa de consolidar o que aprenderam e de testar seus conhecimentos.
                    </p>
                    <p className="text-lg leading-relaxed mt-4">
                        Em uma atualização subsequente, o sistema de gamificação do SAEPflix receberá uma grande reformulação. Esta atualização trará um novo sistema de níveis, medalhas e recompensas, criando uma experiência mais envolvente e motivadora para os alunos. Com esses novos recursos, buscamos incentivar um aprendizado mais dinâmico e recompensador.
                    </p>
                    <p className="text-lg leading-relaxed mt-4">
                        Finalmente, nossa última grande atualização planejada tem como objetivo expandir o alcance do SAEPflix para todo o Brasil. Com esta expansão, pretendemos garantir que nossa plataforma esteja acessível a todos os alunos em diversas regiões, promovendo a inclusão educacional e proporcionando a mesma qualidade de aprendizado para todos.
                    </p>
                </section>
            </div>
        </div>
    );
}