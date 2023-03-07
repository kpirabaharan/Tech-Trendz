const ProductQuery = () => {
  return (
    <div className='flex justify-center gap-8 font-playfair'>
      <button className='py-2 bg-gray-400 w-[100px]'>
        <p>All</p>
      </button>
      <button className='py-2 bg-gray-400 w-[100px]'>
        <p>New</p>
      </button>
      <button className='py-2 bg-gray-400 w-[100px]'>
        <p>Top Rated</p>
      </button>
    </div>
  );
};

export default ProductQuery;
