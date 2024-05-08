import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './provider/cart';
import { AuthProvider } from './provider/auth';
import { FavoritesProvider } from './provider/favorite';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
defineCustomElements(window);
const root = createRoot(container!);
root.render(
  <AuthProvider>
  <CartProvider>
  <FavoritesProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </FavoritesProvider>
  </CartProvider>
  </AuthProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
