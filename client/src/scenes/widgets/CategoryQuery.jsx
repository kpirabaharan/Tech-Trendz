const CategoryQuery = () => {
  return (
    <div
      className='sm:flex sm:justify-center bg-gray-300 mx-4 sm:mx-2 my-4 py-2 px-2 
        rounded-[20px] z-20 shadow-2xl sm:w-[150px]'
    >
      <ul>
        <div className='flex flex-row sm:flex-col justify-evenly h-full text-center'>
          <li>
            <div
              className={`hover:bg-gray-200 transition-colors duration-300 
              text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
            >
              <p>Phones</p>
            </div>
          </li>
          <li>
            <div
              className={`hover:bg-gray-200 transition-colors duration-300 
              text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
            >
              <p>Tablets</p>
            </div>
          </li>
          <li>
            <div
              className={`hover:bg-gray-200 transition-colors duration-300 
              text-center py-2 border-gray-400  border-2 w-[100px] rounded-lg`}
            >
              <p>Computers</p>
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default CategoryQuery;
