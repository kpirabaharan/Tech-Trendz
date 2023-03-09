const Footer = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around min-h-[200px] pt-6 px-16 mb-16 h-auto gap-8 bg-cyan-100'>
      <div className='flex flex-col sm:basis-1/3 justify-around'>
        <p className='text-lg font-bold font-playfair'>E-Commerce</p>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet. Et debitis quisquam vel tempore quas a
          dolor debitis sit fugit nobis et quasi natus et error minima. Non
          deleniti nesciunt hic officia quas est quia nemo.
        </p>
      </div>

      <div className='flex flex-row sm:flex-col justify-between sm:justify-around text-start text-xs'>
        <p className='font-bold'>About Us</p>
        <p>Careers</p>
        <p>Our Stores</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
      </div>
      <div className='flex flex-row sm:flex-col justify-between sm:justify-around text-xs'>
        <p className='font-bold'>Customer Care</p>
        <p>Help Center</p>
        <p>Track Your Order</p>
        <p>Corporate & Bulk Purchasing</p>
        <p>Return & Refunds</p>
      </div>
      <div className='flex flex-row sm:flex-col justify-between sm:justify-around text-xs'>
        <p className='font-bold'>Contact Us</p>
        <p>123 Road St, Ottawa ON</p>
        <p>Email: kpirabaharan3@gmail.com</p>
        <p>(420)-911-2001</p>
      </div>
    </div>
  );
};

export default Footer;
