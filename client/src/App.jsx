import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './scenes/root';
import ProductPage, { productsLoader } from './scenes/product';
import ProductDetailPage, { productLoader } from './scenes/productDetail';
import CartPage from './scenes/cart';
import OrderPage from './scenes/order';
import AuthenticationPage from './scenes/authentication';
import PaymentSuccessPage from './scenes/payment/success';
import PaymentCancelPage from './scenes/payment/cancel';

import './index.css';
import ErrorPage from './scenes/error/Error';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          id: 'products',
          element: <ProductPage />,
          loader: productsLoader,
        },
        {
          path: 'product/:productId',
          id: 'product',
          element: <ProductDetailPage />,
          loader: productLoader,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: 'order',
          element: <OrderPage />,
        },
        {
          path: 'auth',
          element: <AuthenticationPage />,
        },
        {
          path: 'payment',
          children: [
            {
              path: 'success',
              element: <PaymentSuccessPage />,
            },
            {
              path: 'cancel',
              element: <PaymentCancelPage />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
