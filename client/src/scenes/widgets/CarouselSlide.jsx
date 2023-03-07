const CarouselSlide = ({ product }) => {
  return (
    <div className='flex justify-center pt-6 pb-10'>
      <img
        className='max-w-[100%] h-[400px] w-auto'
        src={`http://localhost:8080/assets/${product.picturePath}`}
        alt={product.picturePath}
      />
    </div>
  );
};

export default CarouselSlide;
