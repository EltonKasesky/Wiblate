import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type TableSelectModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  handleTableSelect: (table: string) => void;
  tableMap: { [key: string]: string };
};

export default function TableSelectModal({
  isOpen,
  closeModal,
  handleTableSelect,
  tableMap,
}: TableSelectModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-insert-modal-bg p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Selecione uma Tabela
                </Dialog.Title>
                <div className="mt-2">
                  <ul className="space-y-4">
                    {Object.keys(tableMap).map((label) => (
                      <li key={label}>
                        <button
                          className="modal-input-table"
                          onClick={() => handleTableSelect(label)} // Envia o rótulo da tabela
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-red-900 transition-all ease-in duration-75 hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Fechar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}