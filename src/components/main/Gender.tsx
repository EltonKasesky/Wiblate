import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

export default function Gender() {
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
                            <Link href='/events'>
                                <Image
                                    src='/images/gender/events.png'
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
                            <Link href='/gastronomy'>
                                <Image
                                    src='/images/gender/gastronomy.png'
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
                            <Link href='/knowcity'>
                                <Image
                                    src='/images/gender/knowcity.png'
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
                            <Link href='/news'>
                                <Image
                                    src='/images/gender/news.png'
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