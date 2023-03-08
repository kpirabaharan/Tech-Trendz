// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';

import CarouselSlide from './CarouselSlide';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const ProductCarousel = () => {
  const products = useSelector((state) => state.products.items);

  return (
    <Swiper
      className='h-auto'
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {products.map((product) => (
        <SwiperSlide className='z-[-1]' key={product._id}>
          <CarouselSlide key={product._id} product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
