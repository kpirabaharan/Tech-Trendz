import { Link } from 'react-router-dom';

const CarouselSlide = ({ product }) => {
  return (
    <div className='flex justify-center pt-6 pb-10'>
      <Link to={`/product/${product._id}`}>
        <img
          className='h-[200px] sm:h-[400px] md:h-[500px]'
          src={`http://localhost:8080/assets/${product.picturePath}`}
          alt={product.picturePath}
        />
      </Link>
    </div>
  );
};

export default CarouselSlide;
