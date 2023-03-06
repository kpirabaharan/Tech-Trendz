import { SearchIcon } from '../icons/SearchIcon';

const SearchBar = () => {
  return (
    <div class='relative w-[300px]'>
      <div class='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <SearchIcon className={'w-5 h-5'} />
      </div>
      <input
        type='search'
        id='search'
        class='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500'
        placeholder='Search Products...'
        required
      />
      <button
        type='submit'
        class='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
