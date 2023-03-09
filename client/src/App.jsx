import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './scenes/root';
import ProductPage, { productsLoader } from './scenes/product';
import ProductDetailPage from './scenes/productDetail';
import CartPage from './scenes/cart';

import './index.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          id: 'products',
          element: <ProductPage />,
          loader: productsLoader,
        },
        {
          path: 'product/:productId',
          element: <ProductDetailPage />,
        },
        {
          path: 'cart',
          element: <CartPage />,
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
