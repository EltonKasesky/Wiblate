import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import Image from 'next/image';

export default function PrimarySlide() {
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
                <SwiperSlide>
                    <div className="relative w-full h-full cursor-pointer">
                        <Image
                            src="/slides/programming-code-backend.jpg"
                            alt="Programming Code"
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="brightness-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-full cursor-pointer">
                        <Image
                            src="/slides/cloud.webp"
                            alt="Programming Code"
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="brightness-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}