import { useState, FormEvent, useRef } from "react";
import TableSelectModal from "./TableSelectModal";
import FeedbackModalInsert from "./FeedbackModalInsert";
import Image from "next/image";

export default function InsertCompany() {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false); 
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectGender, setSelectedGender] = useState<string>(''); 
  const [selectedState, setSelectedState] = useState<string>('Rio de Janeiro');
  const [selectedTable, setSelectedTable] = useState<string>('eventos'); 
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const cityMap = {
    Petrópolis: 'Petrópolis',
    'Rio de Janeiro': 'Rio de Janeiro',
  } as const;

  const genderMap = {
    Eventos: 'eventos',
    Gastronomia: 'gastronomia',
    Turismo: 'turismo',
    "Conheça a Cidade": 'conheca-cidade',
  } as const;

  const stateMap = {
    'Rio de Janeiro': 'Rio de Janeiro',
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
      const logoFile = formData.get('logo') as File;
      const catalogFile = formData.get('catalog') as File; 

      if (logoFile) {
        data.logo = await toBase64(logoFile);
      }

      if (catalogFile) { 
        data.catalog = await toBase64(catalogFile);
      }

      data.city = selectedCity;
      data.state = selectedState;
      data.table = selectedTable;
      data.gender = selectGender; 

      const response = await fetch('/api/insertAnnounce', {
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

      setSelectedCity('');
      setSelectedState('Rio de Janeiro');
    } catch (error) {
      setFeedbackMessage('Erro ao enviar dados');
      setIsFeedbackOpen(true);
      console.error('Erro ao enviar dados:', error);
    }
  };


  const openCityModal = () => setIsCityOpen(true);
  const closeCityModal = () => setIsCityOpen(false);

  const openGenderModal = () => setIsGenderOpen(true); 
  const closeGenderModal = () => setIsGenderOpen(false); 

  const openStateModal = () => setIsStateOpen(true);
  const closeStateModal = () => setIsStateOpen(false);

  const handleCitySelect = (city: string) => {
    const cityValue = cityMap[city as keyof typeof cityMap];
    if (cityValue) {
      setSelectedCity(cityValue);
      closeCityModal();
    }
  };

  const handleGenderSelect = (gender: string) => { 
    const genderValue = genderMap[gender as keyof typeof genderMap];
    if (genderValue) {
      setSelectedGender(genderValue);
      closeGenderModal(); 
    }
  };

  const handleStateSelect = (state: string) => {
    const stateValue = stateMap[state as keyof typeof stateMap];
    if (stateValue) {
      setSelectedState(stateValue);
      closeStateModal();
    }
  };

  const displayCityName = (value: string): string => {
    const entry = Object.entries(cityMap).find(([key, val]) => val === value);
    return entry ? entry[0] : 'Selecione uma cidade';
  };

  const displayGenderName = (value: string): string => {
    const entry = Object.entries(genderMap).find(([key, val]) => val === value);
    return entry ? entry[0] : 'Selecione o gênero do anúncio'; 
  };

  const displayStateName = (value: string): string => {
    const entry = Object.entries(stateMap).find(([key, val]) => val === value);
    return entry ? entry[0] : 'Selecione um estado';
  };

  return (
    <>
      <section className="pb-12 m-0 box-border text-main-size">
        <section className="flex justify-center items-center w-full h-insert">
          <div className="flex justify-center items-center w-full h-auto max-w-insert py-insert-form px-4 rounded-lg bg-box-bg">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <form
                className="w-full"
                id="insertForm"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                ref={formRef}
              >
                <div className="flex flex-row gap-6 h-full" /> {/* Duas colunas */}

                <div className="grid grid-cols-2 gap-4">
                  {/* Coluna 1 */}
                  <div className="flex flex-col gap-insert">
                    <div className="flex flex-col">
                      <label htmlFor="gender">Selecione o Gênero</label>
                      <button
                        type="button"
                        className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                        onClick={openGenderModal}
                      >
                        {displayGenderName(selectGender)}
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="city">Selecione a Cidade</label>
                      <button
                        type="button"
                        className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                        onClick={openCityModal}
                      >
                        {displayCityName(selectedCity)}
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="state">Selecione o Estado</label>
                      <button
                        type="button"
                        className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                        onClick={openStateModal}
                      >
                        {displayStateName(selectedState)}
                      </button>
                    </div>
                    <div className="input-file">
                      <label htmlFor="logo">Logo da Empresa</label>
                      <div className="file-drop-insert" id="logo-drop">
                        <input
                          type="file"
                          name="logo"
                          id="logo"
                          className="input-insert input-file-hidden-insert"
                          required
                        />
                        <span className="drop-text-insert" id="dropText">
                          <i className="bx bx-import"></i> Selecione seu arquivo
                        </span>
                      </div>
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
                  </div>

                  {/* Coluna 2 */}
                  <div className="flex flex-col gap-insert">
                    <div className="flex flex-col">
                      <label htmlFor="idYoutube">ID do vídeo</label>
                      <input
                        className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                        type="text"
                        name="idYoutube"
                        id="idYoutube"
                        placeholder="Ex: 8uQqaauS5UA"
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="companyName">Nome da Empresa</label>
                      <input
                        className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                        type="text"
                        name="companyName"
                        id="companyName"
                        placeholder="Ex: Empresa XYZ"
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="address">Endereço</label>
                      <input
                        className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Ex: Rua ABC, 123"
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="phone">Telefone</label>
                      <input
                        className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                        type="text"
                        name="phone"
                        placeholder="Ex: (21) 99999-9999"
                        required
                        maxLength={15}
                        onInput={(e) => {
                          const input = e.currentTarget;
                          let value = input.value.replace(/\D/g, '');
                          if (value.length > 11) value = value.slice(0, 11);
                          if (value.length > 0) value = '(' + value;
                          if (value.length > 3) value = value.slice(0, 3) + ') ' + value.slice(3);
                          if (value.length > 10) value = value.slice(0, 10) + '-' + value.slice(10);
                          input.value = value;
                        }}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="message">Mensagem</label>
                      <textarea
                        className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                        name="message"
                        id="message"
                        rows={4}
                        placeholder="Insira informações sobre a empresa"
                        maxLength={400}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Botão de Enviar centralizado */}
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="border-none rounded-lg p-2 font-medium bg-main-color text-text-color transition-opacity duration-50 cursor-pointer hover:opacity-70"
                  >
                    Enviar
                  </button>
                </div>
              </form>

              {/* Imagem abaixo do formulário */}
              <div className="mt-6 w-full flex justify-center">
                <Image
                  className="rounded-lg"
                  src='/images/insert/Teste.png'
                  width={500}
                  height={762}
                  alt='Teste Image'
                  priority
                  layout="intrinsic" 
                />
              </div>
            </div>
          </div>
        </section>
      </section>

      <TableSelectModal
        isOpen={isCityOpen}
        closeModal={closeCityModal}
        handleTableSelect={handleCitySelect}
        tableMap={cityMap}
      />

      <TableSelectModal
        isOpen={isStateOpen}
        closeModal={closeStateModal}
        handleTableSelect={handleStateSelect}
        tableMap={stateMap}
      />

      <TableSelectModal
        isOpen={isGenderOpen}
        closeModal={closeGenderModal}
        handleTableSelect={handleGenderSelect}
        tableMap={genderMap}
      />

      <FeedbackModalInsert
        isOpen={isFeedbackOpen}
        closeModal={() => setIsFeedbackOpen(false)}
        feedbackMessage={feedbackMessage}
      />
    </>
  );

}