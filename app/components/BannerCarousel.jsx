'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';

export default function BannerCarousel() {
  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay]}
      className="w-full max-w-sm rounded-xl shadow-md"
    >
      <SwiperSlide>
        <img src="/baner.jpg" alt="Banner 1" className="w-full rounded-xl object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/baner2.jpg" alt="Banner 2" className="w-full rounded-xl object-cover" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/baner3.jpg" alt="Banner 3" className="w-full rounded-xl object-cover" />
      </SwiperSlide>
    </Swiper>
  );
}
