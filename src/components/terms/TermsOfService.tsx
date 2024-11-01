import React from "react";
import Link from "next/link";
import BackButtonTermsPrivacy from "../ui/BackButtonTermsPrivacy";

export default function TermsOfService() {
    return (
        <section className="flex flex-col justify-center items-center text-left mt-12 w-full antialiased">
            <BackButtonTermsPrivacy />
            <div className="flex flex-col items-start max-w-7xl px-4 py-28 terms-privacy:py-10">
                <h2 className="text-2xl font-semibold mb-4">1. Termos</h2>
                <p>
                    Ao acessar ao site <Link href="/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TIPTV</Link>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">2. Uso de Licença</h2>
                <p>
                    É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site TIPTV, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
                </p>
                <ol className="list-decimal list-inside mb-4">
                    <li>modificar ou copiar os materiais;</li>
                    <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                    <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site TIPTV;</li>
                    <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
                    <li>transferir os materiais para outra pessoa ou &apos;espelhe&apos; os materiais em qualquer outro servidor.</li>
                </ol>
                <p>
                    Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por TIPTV a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">3. Isenção de responsabilidade</h2>
                <ol className="list-decimal list-inside mb-4">
                    <li>Os materiais no site da TIPTV são fornecidos &apos;como estão&apos;. TIPTV não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</li>
                    <li>Além disso, o TIPTV não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</li>
                </ol>
                <h2 className="text-2xl font-semibold mt-6 mb-4">4. Limitações</h2>
                <p>
                    Em nenhum caso o TIPTV ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em TIPTV, mesmo que TIPTV ou um representante autorizado da TIPTV tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequenciais ou incidentais, essas limitações podem não se aplicar a você.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">5. Precisão dos materiais</h2>
                <p>
                    Os materiais exibidos no site da TIPTV podem incluir erros técnicos, TIPográficos ou fotográficos. TIPTV não garante que qualquer material em seu site seja preciso, completo ou atual. TIPTV pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, TIPTV não se compromete a atualizar os materiais.
                </p>
                <h2 className="text-2xl font-semibold mt-6 mb-4">6. Links</h2>
                <p>
                    O TIPTV não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosse por TIPTV do site. O uso de qualquer site vinculado é por conta e risco do usuário.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">Modificações</h3>
                <p>
                    O TIPTV pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">Lei aplicável</h3>
                <p>
                    Estes termos e condições são regidos e interpretados de acordo com as leis do TIPTV e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">Coleta de Dados de Localização</h3>
                <p>
                    Para fornecer uma experiência mais personalizada, o TIPTV pode coletar informações sobre a localização do usuário. Esses dados são usados para melhorar o serviço e adaptar o conteúdo de acordo com a localização geográfica do usuário. Ao utilizar o site, você concorda com a coleta e uso dessas informações conforme descrito em nossa política de privacidade.
                </p>
            </div>
        </section>
    );
};