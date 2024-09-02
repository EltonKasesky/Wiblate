'use client'

import { useEffect } from "react";
import Script from "next/script";

import Image from "next/image";
import BackButton from "../ui/BackButton";
import Hardware from "../main/Hardware";
import AnnounceKnowCity from "./Announce";

export default function KnowCity() {
    useEffect(() => {
        const initializeCarousel = () => {
            if (typeof window !== 'undefined' && window.jQuery && typeof window.jQuery.fn.owlCarousel === 'function') {
                const carouselElement = window.jQuery('#hardware-section');
                if (carouselElement.data('owl.carousel')) {
                    carouselElement.trigger('destroy.owl.carousel');
                }
                carouselElement.owlCarousel({
                    items: 5,
                    loop: true,
                    nav: true,
                    dots: false,
                    autoplay: false,
                    responsive: {
                        0: { items: 1 },
                        600: { items: 3 },
                        1000: { items: 5 }
                    }
                });
            }
        };
        setTimeout(initializeCarousel, 0);
    }, []);

    return (
        <>
            <section className="flex flex-col w-full h-full pb-20">
                <div className="flex justify-center items-center relative w-full h-gender-pages-image-mobile overflow-hidden lg:h-gender-pages-image">
                    <BackButton />
                    <Image
                        src='/slides/network.jpg'
                        width={1920}
                        height={1080}
                        alt="Events Image"
                        priority
                        className="object-cover object-center w-full h-full max-w-full max-h-full"
                    />
                </div>
                <AnnounceKnowCity />
                <Hardware id="hardware-section"/>
            </section>

            <Script
                src="https://code.jquery.com/jquery-3.7.1.js"
                integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
                crossOrigin="anonymous"
                strategy='beforeInteractive'
            />
        </>
    );
}