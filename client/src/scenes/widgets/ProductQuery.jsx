import { useDispatch } from 'react-redux';
import { setMode } from '../../state/product-slice';

const ProductQuery = () => {
  const dispatch = useDispatch();

  const onQueryPressed = (mode) => {
    console.log({
      mode: mode,
    });
    dispatch(setMode({mode}));
  };

  return (
    <div className='flex justify-center gap-8 font-playfair'>
      <button
        className='py-2 bg-gray-400 w-[100px]'
        onClick={() => onQueryPressed('all')}
      >
        <p>All</p>
      </button>
      <button
        className='py-2 bg-gray-400 w-[100px]'
        onClick={() => onQueryPressed('new')}
      >
        <p>New</p>
      </button>
      <button
        className='py-2 bg-gray-400 w-[100px]'
        onClick={() => onQueryPressed('top')}
      >
        <p>Top Rated</p>
      </button>
    </div>
  );
};

export default ProductQuery;
