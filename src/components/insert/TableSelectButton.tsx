interface TableSelectButtonProps {
    selectedTable: string;
    openModal: () => void;
    displayTableName: (value: string) => string;
}

export default function TableSelectButton({
    selectedTable,
    openModal,
    displayTableName,
}: TableSelectButtonProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor="select" className="text-black dark:text-white">Selecione qual a tabela</label>
            <button
                type="button"
                className="border-2 border-dashed border-gray-300 dark:border-white bg-transparent rounded-sm py-1 px-4 text-black dark:text-white"
                onClick={openModal}
            >
                {displayTableName(selectedTable)}
            </button>
        </div>
    );
}
