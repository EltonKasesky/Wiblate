import { useState, FormEvent, useRef } from "react";
import TableSelectModal from "./TableSelectModal";
import FeedbackModalInsert from "./FeedbackModalInsert";
import FileInput from "./FileInput";
import TextInput from "./TextInput";

export default function InsertCompany() {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectGender, setSelectedGender] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<{ ifood?: string }>({}); // Estado para campos dinâmicos
  const formRef = useRef<HTMLFormElement>(null);

  const cityMap = {
    Petrópolis: 'Petrópolis',
    'Rio de Janeiro': 'Rio de Janeiro',
  } as const;

  const genderMap = {
    Eventos: 'eventos',
    Gastronomia: 'gastronomia',
    Notícias: 'noticias',
    "Conheça a Cidade": 'conheca-cidade',
  } as const;

  const stateMap = {
    'Rio de Janeiro': 'Rio de Janeiro',
    'São Paulo': 'São Paulo',
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

      if (dynamicFields.ifood) {
        data.ifood = dynamicFields.ifood;
      }

      const result = await response.json();
      setFeedbackMessage(result.message);
      setIsFeedbackOpen(true);

      if (formRef.current) {
        formRef.current.reset();
      }

      setSelectedCity('');
      setSelectedState('');
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

      if (genderValue === 'gastronomia') {
        setDynamicFields({ ifood: '' });
      } else {
        setDynamicFields({});
      }
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
      <section className="box-border flex items-center justify-center w-full h-screen mt-8 lg:mt-0 text-main-size">
        <section className="flex justify-center items-center w-full h-auto lg:h-insert">
          <div className="flex justify-center items-center w-full h-auto lg:max-w-[80%] px-4 pb-4 lg:py-4 rounded-lg bg-insert-light dark:bg-insert-dark">
            <div className="flex flex-col lg:flex-row justify-between w-full h-full gap-8">
              <form
                className="w-full"
                id="insertForm"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                ref={formRef}
              >
                <div className="flex flex-wrap lg:flex-nowrap gap-6 w-full">
                  {/* Coluna 1 */}
                  <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    <div className="flex flex-col">
                      <label htmlFor="gender" className="text-black dark:text-white">Selecione o Gênero *</label>
                      <button
                        type="button"
                        className="border-2 border-dashed border-gray-300 dark:border-white bg-transparent rounded-sm py-1 px-4 text-black dark:text-white"
                        onClick={openGenderModal}
                      >
                        {displayGenderName(selectGender)}
                      </button>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="city" className="text-black dark:text-white">Selecione a Cidade *</label>
                      <button
                        type="button"
                        className="border-2 border-dashed border-gray-300 dark:border-white bg-transparent rounded-sm py-1 px-4 text-black dark:text-white"
                        onClick={openCityModal}
                      >
                        {displayCityName(selectedCity)}
                      </button>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="state" className="text-black dark:text-white">Selecione o Estado *</label>
                      <button
                        type="button"
                        className="border-2 border-dashed border-gray-300 dark:border-white bg-transparent rounded-sm py-1 px-4 text-black dark:text-white"
                        onClick={openStateModal}
                      >
                        {displayStateName(selectedState)}
                      </button>
                    </div>

                    <FileInput
                      id="logo"
                      label="Logo da Empresa *"
                      name="logo"
                      required={true}
                    />

                    <FileInput
                      id="catalog"
                      label="Imagem de Catálogo *"
                      name="catalog"
                      required={true}
                    />

                    {selectGender === 'gastronomia' && (
                      <TextInput
                        id="ifood"
                        label="Ifood"
                        name="ifood"
                        placeholder="Insira o link do Ifood"
                        value={dynamicFields.ifood || ''}
                        onChange={(e) => setDynamicFields({ ...dynamicFields, ifood: e.target.value })}
                      />
                    )}

                  </div>

                  {/* Coluna 2 */}
                  <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    <TextInput
                      id="idYoutube"
                      label="ID do vídeo *"
                      name="idYoutube"
                      placeholder="Ex: 8uQqaauS5UA"
                      required={true}
                    />

                    <TextInput
                      id="companyName"
                      label="Nome da Empresa *"
                      name="companyName"
                      placeholder="Ex: Empresa XYZ"
                      required={true}
                    />

                    <TextInput
                      id="address"
                      label="Endereço"
                      name="address"
                      placeholder="Ex: Rua ABC, 123"
                      required={false}
                    />

                    <TextInput
                      id="phone"
                      label="Telefone"
                      name="phone"
                      placeholder="Ex: (21) 99999-9999"
                      required={false}
                    />

                    <TextInput
                      id="instagram"
                      label="Instagram"
                      name="instagram"
                      placeholder="Ex: https://www.instagram.com/wiblate/"
                      required={false}
                    />

                    <div className="flex flex-col">
                      <label htmlFor="message" className="text-black dark:text-white">Mensagem *</label>
                      <textarea
                        className="border-2 border-dashed border-gray-300 dark:border-white bg-transparent rounded-sm px-4 text-black dark:text-white"
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
                    className="w-full border border-main-color-light rounded-lg p-2 font-medium bg-main-color-light text-white hover:bg-transparent hover:text-main-color transition-all duration-100"
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