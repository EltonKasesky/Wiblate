'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import Script from "next/script";
import Image from "next/image";
import BackButton from "../ui/BackButton";
import Gastronomy from "../gender/Gastronomy";
import AnnounceGastronomy from "./Announce";

export default function GastronomyPage() {
    const searchParams = useSearchParams();
    const city = searchParams.get('city') || 'default';
    const state = searchParams.get('state') || 'default';
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const fetchGastronomy = async () => {
            try {
                const response = await fetch(`/api/gender/gastronomy?city=${city}&state=${state}`);
                const data = await response.json();
                setEventData(data);
            } catch (error) {
                console.error('Error fetching Gastronomy:', error);
            }
        };

        fetchGastronomy();
    }, [city, state]);

    return (
        <>
            <section className="flex flex-col w-full h-full pb-20">
                <div className="flex justify-center items-center relative w-full h-gender-pages-image-mobile overflow-hidden lg:h-gender-pages-image">
                    <BackButton />
                    <Image
                        src='/slides/network.jpg'
                        width={1920}
                        height={1080}
                        alt="Gastronomy Image"
                        priority
                        className="object-cover object-center w-full h-full max-w-full max-h-full"
                    />
                </div>

                <AnnounceGastronomy />

                <Gastronomy id="Gastronomy-section" />
            </section>

            <Script
                src="https://code.jquery.com/jquery-3.7.1.js"
                integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
                crossOrigin="anonymous"
            />
        </>
    );
}