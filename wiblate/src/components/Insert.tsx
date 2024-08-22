import { useState, FormEvent, useRef } from "react";
import TableSelectModal from "./insert/TableSelectModal";
import FeedbackModal from "./insert/FeedbackModal";
import Image from "next/image";

export default function Insert() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const tableMap = {
    Destaque: 'primaryslide',
    'Lógica de Programação': 'logic',
    'Banco de Dados': 'databank',
    'Estrutura de Rede': 'networkstructure',
    Hardware: 'hardware'
  } as const;

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          const base64String = result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Erro ao converter o arquivo para base64'));
        }
      };
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data: { [key: string]: FormDataEntryValue | string } = Object.fromEntries(formData.entries());

    try {
      const catalogFile = formData.get('catalog') as File;
      const backgroundFile = formData.get('background') as File;

      if (catalogFile && backgroundFile) {
        data.catalog = await toBase64(catalogFile);
        data.background = await toBase64(backgroundFile);
      }

      data.select = selectedTable;

      const response = await fetch('/api/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setFeedbackMessage(result.message);
      setIsFeedbackOpen(true);

      if (formRef.current) {
        formRef.current.reset();
      }

      setSelectedTable('');
    } catch (error) {
      setFeedbackMessage('Erro ao enviar dados');
      setIsFeedbackOpen(true);
      console.error('Erro ao enviar dados:', error);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleTableSelect = (table: string) => {
    const tableValue = tableMap[table as keyof typeof tableMap]; // Obter o valor da tabela a partir do rótulo
    if (tableValue) {
      setSelectedTable(tableValue);
      closeModal();
    }
  };  

  const displayTableName = (value: string): string => {
    const entry = Object.entries(tableMap).find(([key, val]) => val === value);
    return entry ? entry[0] : 'Selecione uma tabela';
  };

  return (
    <>
      <section className="py-24 m-0 box-border text-main-size">
        <section className="flex justify-center items-center w-full h-insert">
          <div className="hidden insert-image:block w-full h-insert-image max-w-insert">
            <Image
              className="rounded-l-lg"
              src='/images/insert-image.png'
              width={500}
              height={762}
              alt='Insert Image'
              priority
            />
          </div>
          <div className="flex justify-center items-center w-full h-auto max-w-insert py-insert-form px-4 rounded-r-lg bg-box-bg">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <form
                className="w-full"
                id="insertForm"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                ref={formRef}
              >
                <div className="flex flex-col gap-insert h-full">
                  <div className="flex flex-col">
                    <label htmlFor="select">Selecione qual a tabela</label>
                    <button
                      type="button"
                      className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                      onClick={openModal}
                    >
                      {displayTableName(selectedTable)}
                    </button>
                  </div>
                  <div className="input-id-insert">
                    <label htmlFor="idYoutube">ID do video</label>
                    <input
                      className="input-insert"
                      type="text"
                      name="idYoutube"
                      id="idYoutube"
                      placeholder="Ex: 8uQqaauS5UA"
                      required
                    />
                  </div>
                  <div className="input-id-insert">
                    <label htmlFor="creators">Nome dos criadores</label>
                    <input
                      className="input-insert"
                      type="text"
                      name="creators"
                      id="creators"
                      placeholder="Ex: Elton Kasesky, Pedro Cler"
                      required
                    />
                  </div>
                  <div className="input-file">
                    <label htmlFor="catalog">Imagem de catálogo</label>
                    <div className="file-drop-insert" id="catalog-drop">
                      <input
                        type="file"
                        name="catalog"
                        id="catalog"
                        className="input-insert input-file-hidden-insert"
                        required
                      />
                      <span className="drop-text-insert" id="dropText">
                        <i className="bx bx-import"></i> Selecione seu arquivo
                      </span>
                    </div>
                  </div>
                  <div className="input-file">
                    <label htmlFor="background">Imagem de Fundo</label>
                    <div className="file-drop-insert" id="background-drop">
                      <input
                        type="file"
                        name="background"
                        id="background"
                        className="input-insert input-file-hidden-insert"
                        required
                      />
                      <span className="drop-text-insert" id="dropText">
                        <i className="bx bx-import"></i> Selecione seu arquivo
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="border-none rounded-lg p-2 font-medium bg-main-color text-text-color transition-opacity duration-50 cursor-pointer hover:opacity-70"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>

      <TableSelectModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleTableSelect={handleTableSelect}
        tableMap={tableMap}
      />

      <FeedbackModal
        isOpen={isFeedbackOpen}
        closeModal={() => setIsFeedbackOpen(false)}
        feedbackMessage={feedbackMessage}
      />
    </>
  );
}