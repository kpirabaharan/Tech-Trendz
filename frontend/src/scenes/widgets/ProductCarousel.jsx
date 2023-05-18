// import Swiper core and required modules
import { useState } from 'react';

import { DotIcon } from '../../icons/DotIcon';
import { LeftChevron } from '../../icons/LeftChevron';
import { RightChevron } from '../../icons/RightChevron';

const ProductCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === products.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[1400px] h-[400px] w-full m-auto px-4 relative group'>
      <div
        style={{
          backgroundImage: `url(${import.meta.env.VITE_NODE_SERVER}assets/${
            products[currentIndex].picturePath
          })`,
          backgroundRepeat: 'no-repeat',
        }}
        className='w-full h-full rounded-2xl bg-center bg-contain duration-500 block object-contain'
      ></div>

      {/* Left Arrow */}
      <div
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5
      text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
      >
        <LeftChevron onClickFn={prevSlide} />
      </div>

      {/* Right Arrow */}
      <div
        className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5
      text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
      >
        <RightChevron onClickFn={nextSlide} />
      </div>

      {/* Dots */}
      <div className='flex top-4 justify-center py-2'>
        {products.map((product, index) => (
          <div
            key={product._id}
            className='cursor-pointer'
            onClick={() => goToSlide(index)}
          >
            <DotIcon isIndex={index == currentIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
