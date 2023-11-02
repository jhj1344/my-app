import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Router, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AllProduct from './pages/AllProduct';
import NewProduct from './pages/NewProduct';
import NotFound from './pages/NotFound';
import MyCart from './pages/MyCart';

const root = ReactDOM.createRoot(document.getElementById('root'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
      {path : '/products', element:<AllProduct/>},
      {path : '/products/new', element:<NewProduct/>},
      {path : '/cart', element:<MyCart/>}
    ]
  }

])

root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
