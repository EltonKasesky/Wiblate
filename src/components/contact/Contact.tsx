'use client';

import { useState } from "react";
import FeedbackModalContact from "./FeedbackModalContact";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        tel: "",
        message: "",
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
                setFormData({ name: "", email: "", tel: "", message: "" });
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
        <section className="container pt-24 pb-16 mx-auto px-2 mt-20 mb-10 sm:px-6 md:my-0 lg:px-8">
            <div className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-md text-black">
                <h2 className="text-3xl font-semibold mb-6 text-center">Contato</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
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
                            className="w-full flex items-center font-semibold justify-center h-google-button px-6 mt-4 bg-main-color border border-main-color text-white p-3 rounded-lg hover:bg-white hover:text-main-color transition-all duration-100"
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
            </div>
        </section>
    );
}