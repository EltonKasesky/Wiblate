import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
// import useLocation from '@/components/LocationDisplay'; // Hook para obter a localização

export default function Gender() {
    // const location = useLocation();
    // const city = location?.city || "default";
    // const state = location?.region || "default"; // Adiciona o estado
    const city="Petrópolis";
    const state="Rio de Janeiro";

    const content = [
        { page: 'events', imgSrc: '/images/gender/events.png', alt: 'Events' },
        { page: 'gastronomy', imgSrc: '/images/gender/gastronomy.png', alt: 'Gastronomy' },
        { page: 'knowcity', imgSrc: '/images/gender/knowcity.png', alt: 'Know City' },
        { page: 'news', imgSrc: '/images/gender/news.png', alt: 'News' },
    ];

    return (
        <section className="container flex justify-center items-center pt-5 w-full">
            <div className="w-full">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                >
                    {content.map((item, index) => (
                        <SwiperSlide key={index} className="flex justify-center items-center p-2">
                            <div className="gender-content">
                                {/* Passar a cidade e o estado via query string */}
                                <Link href={`/${item.page}?city=${city}&state=${state}`}>
                                    <Image
                                        src={item.imgSrc}
                                        layout="fill"
                                        objectFit="cover"
                                        alt={item.alt}
                                        priority
                                    />
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
