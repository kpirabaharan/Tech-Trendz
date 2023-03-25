import { Link } from 'react-router-dom';

const ProductQuery = ({ onPageChange, mode, onModeChange }) => {
  return (
    <div className='flex justify-center gap-8 font-playfair'>
      <Link
        className={`
          ${
            mode == 'all'
              ? 'bg-blue-300'
              : 'hover:bg-gray-200 transition-colors duration-300'
          }
        text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
        to={'/?mode=all&page=1'}
        onClick={() => {
          onPageChange(1);
          onModeChange('all');
        }}
      >
        All
      </Link>
      <Link
        className={`
          ${
            mode == 'new'
              ? 'bg-blue-300'
              : 'hover:bg-gray-200 transition-colors duration-300'
          }
        text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
        to={'/?mode=new&page=1'}
        onClick={() => {
          onPageChange(1);
          onModeChange('new');
        }}
      >
        New
      </Link>
      <Link
        className={`
          ${
            mode == 'top'
              ? 'bg-blue-300'
              : 'hover:bg-gray-200 transition-colors duration-300'
          }
        text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
        to={'/?mode=top&page=1'}
        onClick={() => {
          onPageChange(1);
          onModeChange('top');
        }}
      >
        Top Rated
      </Link>
    </div>
  );
};

export default ProductQuery;
