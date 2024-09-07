interface TextInputProps {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
}

export default function TextInput({ id, label, name, placeholder, required }: TextInputProps) {
    return (
        <div className="input-id-insert">
            <label htmlFor={id}>{label}</label>
            <input
                className="input-insert"
                type="text"
                name={name}
                id={id}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}
