import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import App from './App';
import store from './state';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider Provider={store}> */}
    <App />
    {/* </Provider> */}
  </StrictMode>,
);
