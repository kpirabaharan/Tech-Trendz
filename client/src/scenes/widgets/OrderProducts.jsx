const OrderProducts = ({ product }) => {
  return (
    <div className='flex flex-row py-4'>
      <div
        className='h-[80px] w-[80px] md:w-[10%] bg-gray-200 rounded-[8px]
          flex justify-center items-center'
      >
        <div className='w-[75%] flex justify-center'>
          <img
            className='block object-contain h-[50px]'
            src={`http://localhost:8080/assets/${product.picturePath}`}
            alt={product.picturePath}
          />
        </div>
      </div>
      <div className='flex flex-col flex-1 justify-center pl-4'>
        <p className='text-[22px] font-opensans text-[#202020]'>
          {product.name}
        </p>
        <p className='font-opensans text-[#7c7c7c]'>{product.brand}</p>
      </div>
      <div className='flex flex-col justify-center pl-4 text-end'>
        <p className='text-[22px] font-opensans text-[#202020]'>
          ${(product.cost * product.quantity).toFixed(2)}
        </p>
        <p className='font-opensans text-[#7c7c7c]'>
          Quantity: {product.quantity}
        </p>
      </div>
    </div>
  );
};

export default OrderProducts;
