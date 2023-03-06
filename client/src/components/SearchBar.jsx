import { SearchIcon } from '../icons/SearchIcon';

const SearchBar = ({ isSmallScreen }) => {
  const outerDiv = isSmallScreen
    ? 'flex left-[50%] translate-x-[-50%] justify-center w-5/6 fixed pt-[84px]'
    : 'relative w-[300px]';
  return (
    <div className={outerDiv}>
      <div
        className={`absolute ${isSmallScreen ? 'bottom-4' : 'inset-y-0'} left-0 
        flex items-center pl-3 pointer-events-none`}
      >
        <SearchIcon className={'w-5 h-5'} />
      </div>
      <input
        type='search'
        id='search'
        className='block w-full p-4 pl-10 text-sm placeholder:text-gray-700 text-gray-900 
          borderborder-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500'
        placeholder='Search Products...'
        required
      />
      <button
        type='submit'
        className='text-blue absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
          px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
