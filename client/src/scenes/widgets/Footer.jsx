const Footer = () => {
  return (
    <div className='flex justify-around min-h-[200px] pt-6 px-16 mb-16 h-auto gap-8 bg-cyan-100'>
      <div className='flex flex-col justify-around max-w-[50%]'>
        <p className='text-lg font-bold font-playfair'>E-Commerce</p>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet. Et debitis quisquam vel tempore quas a
          dolor debitis sit fugit nobis et quasi natus et error minima. Non
          deleniti nesciunt hic officia quas est quia nemo.
        </p>
      </div>
      <div className='flex flex-col justify-around text-xs'>
        <p className='font-bold'>About Us</p>
        <p>Careers</p>
        <p>Our Stores</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
      </div>
      <div className='flex flex-col justify-around text-xs'>
        <p className='font-bold'>Customer Care</p>
        <p>Help Center</p>
        <p>Track Your Order</p>
        <p>Corporate & Bulk Purchasing</p>
        <p>Return & Refunds</p>
      </div>
      <div className='flex flex-col justify-around text-xs'>
        <p className='font-bold'>Contact Us</p>
        <p>123 Road St, Ottawa ON</p>
        <p>Email: kpirabaharan3@gmail.com</p>
        <p>(416-6273498)</p>
      </div>
    </div>
  );
};

export default Footer;
