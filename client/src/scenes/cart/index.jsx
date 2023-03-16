import { useSelector } from 'react-redux';

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  console.log({ cart, total });

  return <div className='w-5/6 mx-auto'>CartPage</div>;
};

export default CartPage;
