import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

export default function AnnounceNews() {
    return (
        <section className="container flex justify-center items-center pt-5 w-full">
            <div className="w-full">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    <SwiperSlide className="flex justify-center items-center p-2">
                        <div className="gender-content">
                            <Link href='#'>
                                <Image
                                    src='/images/announce/news/announce.png'
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Gender"
                                    priority
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center p-2">
                        <div className="gender-content">
                            <Link href='#'>
                                <Image
                                    src='/images/announce/news/announce.png'
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Gender"
                                    priority
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center p-2">
                        <div className="gender-content">
                            <Link href='#'>
                                <Image
                                    src='/images/announce/news/announce.png'
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Gender"
                                    priority
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center p-2">
                        <div className="gender-content">
                            <Link href='#'>
                                <Image
                                    src='/images/announce/news/announce.png'
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Gender"
                                    priority
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}