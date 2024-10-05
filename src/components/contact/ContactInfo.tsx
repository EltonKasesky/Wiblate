import Link from "next/link";

export default function ContactInfo() {
    return (
        <>
            <section className="w-full max-w-md bg-box-bg p-7 shadow-md rounded-l-md text-black dark:text-white border border-gray-300 dark:border-white border-r-0">
                <div className="flex flex-col items-center h-full over bg-contact-info-light dark:bg-contact-info-dark dark:border-none p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold mb-6 text-center">TIPTV</h2>
                    <div className="w-full my-6 space-y-6">
                        <div className="flex items-center space-x-4">
                            <i className='bx bx-time text-main-color text-lg' ></i>
                            <div>
                                <h3 className="info-title">Horários de Atendimento</h3>
                                <p className="info-items">Segunda a sexta: 08:00 às 17:00.</p>
                                <p className="info-items">Sábado e Domingo: 10:00 às 15:00.</p>
                                <p className="info-items">Feriados: Não haverá atendimento.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <i className='bx bx-phone-incoming text-main-color text-lg' ></i>
                            <div>
                                <h3 className="info-title">Telefone para Contato</h3>
                                <p className="info-items">Tel: XXXX-XXXX</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <i className='bx bxl-whatsapp text-main-color text-lg' ></i>
                            <div>
                                <h3 className="info-title">WhatsApp para Contato</h3>
                                <p className="info-items">Tel: (24) XXXXX-XXXX</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <i className='bx bxs-business text-main-color text-lg' ></i>
                            <div>
                                <h3 className="info-title">Parceria e Patricínio</h3>
                                <p className="info-items">Entrar em contato utilizando o formulário.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <i className='bx bx-help-circle text-main-color text-lg'></i>
                            <div>
                                <h3 className="info-title">FAQ - Perguntas Frequentes</h3>
                                <p className="info-items">Explore as perguntas frequentes da TIPTV para encontrar respostas rápidas e úteis.</p>
                                <Link href='/faq' className="text-main-color hover:underline">Acessar FAQ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}