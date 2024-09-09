import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SlideData {
    catalog: string;
}

export default function PrimarySlide() {
    const [slides, setSlides] = useState<SlideData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const res = await fetch('/api/videos/banner');
                const data = await res.json();

                // Verifica se o retorno é um array
                if (Array.isArray(data)) {
                    setSlides(data);
                } else {
                    console.error('API response is not an array:', data);
                }

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch slides:', error);
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!Array.isArray(slides) || slides.length === 0) {
        return <p>No slides available</p>;
    }

    return (
        <div className="relative pt-8">
            <Swiper
                modules={[Navigation, Pagination, EffectFade, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="h-[500px] md:h-[600px] lg:h-[700px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full cursor-pointer">
                            <Image
                                src={`data:image/jpeg;base64,${slide.catalog}`} // Usando o campo catalog
                                alt={`Slide ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                priority
                                unoptimized={true} // Desabilita otimização para base64
                                className="brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
