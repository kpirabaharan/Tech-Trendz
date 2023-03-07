const CarouselSlide = ({ product }) => {
  return (
    <div className='flex justify-center pt-6 pb-10'>
      <img
        className='h-[200px] sm:h-[400px] md:h-[500px]'
        src={`http://localhost:8080/assets/${product.picturePath}`}
        alt={product.picturePath}
      />
    </div>
  );
};

export default CarouselSlide;
