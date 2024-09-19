import Link from "next/link";

export default function ContactInfo(){
    return (
        <>
            <section className="w-full max-w-md bg-box-bg p-7 shadow-md rounded-l-md text-white">
                <div className="flex flex-col items-center h-full over bg-gray-950 p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-center">TIPTV</h2>
                    <div className="w-full my-6 space-y-6">
                        <div className="flex items-center space-x-4">
                            <i className='bx bx-time text-main-color text-lg' ></i>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Horários de Atendimento</h3>
                                <p className="text-gray-400">Segunda a sexta: 08:00 às 17:00.</p>
                                <p className="text-gray-400">Sábado e Domingo: 10:00 às 15:00.</p>
                                <p className="text-gray-400">Feriados: Não haverá atendimento.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <i className='bx bx-phone-incoming text-main-color text-lg' ></i>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Telefone para Contato</h3>
                                <p className="text-gray-400">Tel: XXXX-XXXX</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <i className='bx bxl-whatsapp text-main-color text-lg' ></i>
                            <div>
                                <h3 className="text-lg font-semibold text-white">WhatsApp para Contato</h3>
                                <p className="text-gray-400">Tel: (24) XXXXX-XXXX</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <i className='bx bxs-business text-main-color text-lg' ></i>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Parceria e Patricínio</h3>
                                <p className="text-gray-400">Entrar em contato utilizando o formulário.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <i className='bx bx-help-circle text-main-color text-lg'></i>
                            <div>
                                <h3 className="text-lg font-semibold text-white">FAQ - Perguntas Frequentes</h3>
                                <p className="text-gray-400">Explore as perguntas frequentes da TIPTV para encontrar respostas rápidas e úteis.</p>
                                <Link href='/faq' className="text-main-color hover:underline">Acessar FAQ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}