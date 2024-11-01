'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import ContactInfo from "./ContactInfo";
import FeedbackModalContact from "./FeedbackModalContact";

export default function ContactForm() {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tel: "",
        message: "",
        subject: ""
    });
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "tel") {
            let formattedTel = value
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d)(\d{4})$/, '$1-$2');

            setFormData((prevData) => ({ ...prevData, tel: formattedTel }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session) {
            setFeedbackMessage("Erro ao enviar, você precisa realizar o login para enviar este formulário.")
            setIsModalOpen(true);
            return;
        }

        setLoading(true);
        setFeedbackMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ name: "", email: "", tel: "", message: "", subject: "" });
                setFeedbackMessage("Mensagem enviada com sucesso!");
            } else {
                setFeedbackMessage("Erro ao enviar a mensagem.");
            }
        } catch (error) {
            setFeedbackMessage("Erro ao enviar a mensagem.");
        } finally {
            setLoading(false);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="flex items-center justify-center flex-wrap container w-full h-screen pt-24 pb-16 mx-auto">
            <ContactInfo />
            <section className="w-full max-w-md bg-box-bg p-8 shadow-md rounded-r-md text-black dark:text-white bg-contact-form-light dark:bg-contact-form-dark border-l-0 border-t border-r border-b border-gray-300 dark:border-white">
                <h2 className="text-3xl font-semibold mb-6 text-center">Contato</h2>
                <form onSubmit={handleSubmit} className="space-y-6 ">
                    <div>
                        <label htmlFor="name" className="contact-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Elton Kasesky"
                            maxLength={40}
                            required
                            className="contact-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="contact-label">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ex: eltonkasesky@xtstream.com"
                            maxLength={50}
                            required
                            className="contact-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="tel" className="contact-label">
                            Número de Celular
                        </label>
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            placeholder="(XX) XXXX-XXXXX"
                            maxLength={15}
                            required
                            className="contact-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="contact-label">
                            Assunto do e-mail
                        </label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Insira o assunto"
                            maxLength={100}
                            required
                            className="contact-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="contact-label">
                            Mensagem
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Insira sua mensagem"
                            maxLength={400}
                            required
                            className="contact-input"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex items-center font-semibold justify-center h-google-button px-6 mt-4 bg-main-color-light border border-main-color text-white p-3 rounded-lg hover:bg-transparent hover:text-main-color transition-all duration-100"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                    </div>
                </form>

                <FeedbackModalContact
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    feedbackMessage={feedbackMessage}
                />
            </section>
        </section>
    );
}