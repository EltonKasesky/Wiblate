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
            <label htmlFor="select">Selecione qual a tabela</label>
            <button
                type="button"
                className="border-2 border-dashed border-text-color bg-transparent rounded-sm py-1 px-4 text-text-color"
                onClick={openModal}
            >
                {displayTableName(selectedTable)}
            </button>
        </div>
    );
}
