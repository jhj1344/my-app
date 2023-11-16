import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Router, Routes, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import AllProduct from './pages/AllProduct';
import NewProduct from './pages/NewProduct';
import NotFound from './pages/NotFound';
import MyCart from './pages/MyCart';
import { useAuthContext } from './context/AuthContext';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './component/CategoryPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

//관리자 인증
const ProtectRoute = ({checkAdmin, children})=>{
  const {user} = useAuthContext();
  if(!user || (checkAdmin && !user.isAdmin)){
    return <Navigate to='/' replace/>
  }
  return children;
}

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>,
    children: [
      {path : '/products', element:<AllProduct/>},
      {
        path : '/products/new', 
        element:
        <ProtectRoute checkAdmin>
          <NewProduct/>
        </ProtectRoute>
      },
      {path : '/cart', element:<MyCart/>},
      {path : '/products/detail/:id', element : <ProductDetail/>},
      {path : '/products/:category', element : <CategoryPage/>}
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
