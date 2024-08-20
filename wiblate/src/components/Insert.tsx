"use client";

import Script from "next/script";
import { useState, FormEvent } from "react";

export default function Insert() {
  const [message, setMessage] = useState('');

  const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        const base64String = result.split(',')[1]; // Remove o prefixo
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

      const response = await fetch('/api/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Erro ao enviar dados');
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <>
      {/* INSERT */}
      <section className="py-24 m-0 box-border text-main-size">
        <section className="flex justify-center items-center w-full h-insert">
          <div className="flex justify-center items-center w-full h-auto max-w-insert py-8 px-4 rounded-lg bg-box-bg">
            <div className="flex flex-col justify-center items-center w-full h-full">
              {/* INSERT FORM */}
              <form
                className="w-full"
                id="insertForm"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-insert h-full">
                  {/* SELECT INSERT */}
                  <div className="flex flex-col">
                    <label htmlFor="select">Selecione qual a tabela</label>
                    <select
                      className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color focus:text-text-color"
                      name="select"
                      id="select"
                      onFocus={(e) => (e.target.size = 5)}
                      onBlur={(e) => (e.target.size = 1)}
                      onChange={(e) => {
                        e.target.size = 1;
                        e.target.blur();
                      }}
                      required
                      defaultValue=""
                    >
                      <optgroup label="Tabelas de videos">
                        <option value="" disabled>
                          Selecione uma tabela
                        </option>
                        <option value="primaryslide">Revisão SAEP</option>
                        <option value="logic">Lógica de Programação</option>
                        <option value="databank">Banco de Dados</option>
                        <option value="networkstructure">
                          Estrutura de Rede
                        </option>
                        <option value="hardware">Hardware</option>
                      </optgroup>
                    </select>
                  </div>
                  {/* END SELECT INSERT */}
                  {/* INPUT ID */}
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
                  {/* END INPUT ID */}
                  {/* INPUT NAMES */}
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
                  {/* END INPUT NAMES */}
                  {/* INPUT CATALOG IMAGE */}
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
                        <i className="bx bx-import"></i> Arraste e solte o arquivo aqui
                      </span>
                    </div>
                  </div>
                  {/* END INPUT CATALOG IMAGE */}
                  {/* INPUT BACKGROUND IMAGE */}
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
                        <i className="bx bx-import"></i> Arraste e solte o arquivo aqui
                      </span>
                    </div>
                  </div>
                  {/* END INPUT BACKGROUND IMAGE */}
                  <button
                    type="submit"
                    className="border-none rounded-button-insert p-2 font-medium bg-main-color text-text-color transition-opacity duration-50 cursor-pointer hover:opacity-70"
                  >
                    Enviar
                  </button>
                </div>
              </form>
              {/* END INSERT FORM */}
              <div id="message" className="w-full mt-5 p-2 rounded-md">
                {message}
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* END INSERT */}

      <Script src="/js/insert.js" strategy="afterInteractive" />
    </>
  );
}
