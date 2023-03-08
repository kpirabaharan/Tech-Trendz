import { Link } from 'react-router-dom';

const ProductQuery = () => {
  return (
    <div className='flex justify-center gap-8 font-playfair'>
      <Link
        className='text-center py-2 border-gray-400 hover:bg-gray-200 border-2 w-[100px] rounded-lg'
        to={'?mode=all'}
      >
        All
      </Link>
      <Link
        className='text-center py-2 border-gray-400 hover:bg-gray-200 border-2 w-[100px] rounded-lg'
        to={'?mode=new'}
      >
        New
      </Link>
      <Link
        className='text-center py-2 border-gray-400 hover:bg-gray-200 border-2 w-[100px] rounded-lg'
        to={'?mode=top'}
      >
        Top Rated
      </Link>
      {/* </button> */}
    </div>
  );
};

export default ProductQuery;
