import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductQuery = () => {
  const [mode, setMode] = useState('all');

  return (
    <div className='flex justify-center gap-8 font-playfair'>
      <Link
        className={`
          ${mode == 'all' ? 'bg-blue-300' : 'hover:bg-gray-200'}
        text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
        to={'/?mode=all'}
        onClick={() => setMode('all')}
      >
        All
      </Link>
      <Link
        className={`
          ${mode == 'new' ? 'bg-blue-300' : 'hover:bg-gray-200'}
        text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
        to={'/?mode=new'}
        onClick={() => setMode('new')}
      >
        New
      </Link>
      <Link
        className={`
          ${mode == 'top' ? 'bg-blue-300' : 'hover:bg-gray-200'}
        text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
        to={'/?mode=top'}
        onClick={() => setMode('top')}
      >
        Top Rated
      </Link>
    </div>
  );
};

export default ProductQuery;
