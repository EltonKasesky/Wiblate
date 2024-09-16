import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
// import useLocation from '@/components/LocationDisplay'; // Hook para obter a localização

export default function Gender() {
    // const location = useLocation();
    // const city = location?.city || "default";
    // const state = location?.region || "default"; // Adiciona o estado
    const city = "Petrópolis";
    const state = "Rio de Janeiro";

    const content = [
        { page: 'events', title: 'Eventos', subTitle: 'XTSTREAM' },
        { page: 'gastronomy', title: 'Gastronomia', subTitle: 'XTSTREAM' },
        { page: 'knowcity', title: `Conheça ${city}`, subTitle: 'XTSTREAM' },
        { page: 'news', title: 'Notícias', subTitle: 'XTSTREAM' },
    ];

    return (
        <section className="container flex justify-center items-center pt-5 w-full">
            <div className="w-full select-none">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Pagination, Navigation]}
                    navigation
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
                                <Link href={`/${item.page}?city=${city}&state=${state}`}>
                                    <div className='flex justify-center items-center h-gender-item bg-gender-bg'>
                                        <div className='flex flex-col items-center justify-center w-full gap-3'>
                                            <p className='text-6xl sm:text-5xl gender-item:text-6xl font-bold text-center'>{item.title}</p>
                                            <p className='text-2xl text-center'>{item.subTitle}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
