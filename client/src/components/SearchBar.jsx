import { SearchIcon } from '../icons/SearchIcon';

const SearchBar = () => {
  return (
    <div className='w-5/6 mx-auto sm:relative sm:w-[300px]'>
      <div className='absolute flex pl-3 bottom-[25px] sm:bottom-[8.6px]'>
        <SearchIcon className={'w-5 h-5'} />
      </div>
      <input
        className='block w-full p-2 pl-10 text-sm placeholder:text-gray-500 
        text-gray-900bg-gray-200 rounded-xl border border-gray-300 
        focus:outline-none focus:border-blue'
        type='search'
        id='search'
        placeholder='Search Products...'
        required
      />
      <div className='absolute bottom-[21px] sm:bottom-[5px] right-0 pr-[9%] sm:pr-[5px]'>
        <button
          className='rounded-xl text-gray-400 text-sm py-1 px-2 
        hover:text-blue'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
