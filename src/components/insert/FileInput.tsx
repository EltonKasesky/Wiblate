import { useState } from "react";

interface FileInputProps {
    id: string;
    label: string;
    name: string;
    required?: boolean;
}

export default function FileInput({ id, label, name, required }: FileInputProps) {
    const [fileName, setFileName] = useState('Selecione ou arraste o arquivo');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div className="input-file">
            <label htmlFor={id}>{label}</label>
            <div className="file-drop-insert" onDragOver={handleDragOver}>
                <input
                    type="file"
                    name={name}
                    id={id}
                    className="input-insert input-file-hidden-insert"
                    onChange={handleFileChange}
                    required={required}
                />
                <span className="flex items-center justify-start gap-2">
                    <i className="bx bx-import"></i>{fileName}
                </span>
            </div>
        </div>
    );
}
