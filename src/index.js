import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './userComponents/Home';
import PageNotFound from './PageNotFound';
import Register from './userComponents/Register';
import Login from './userComponents/Login';
import FetchProducts from './userComponents/productComponents/FetchProducts.js';
import LoginProvider from './context/LoginContext.js';
import Dashboard from './vendorComponents/Dashboard.js';
import ManageProducts from './vendorComponents/productsCRUD/ManageProducts.js';
import AddProduct from './vendorComponents/productsCRUD/AddProduct.js';
import ManageCategories from './vendorComponents/categoriesCRUD/ManageCategories.js';
import UpdateProduct from './vendorComponents/productsCRUD/UpdateProduct.js';

const routes=createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        errorElement:<PageNotFound/>,
        children:[
            {
                path:'/',
                element:<FetchProducts/>,
                index:true
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            
            
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard/>,
        errorElement:<PageNotFound/>,
        children:[
            {
                path:'/dashboard',
                element:<ManageProducts/>,
                index:true
            },
            {
                path:'/dashboard/add-product',
                element:<AddProduct/>
            },
            {
                path:'/dashboard/manage-categories',
                element:<ManageCategories/>
            },
            {
                path:'/dashboard/update-product/:productId',
                element:<UpdateProduct/>
            }
        ]    
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<LoginProvider>
        <RouterProvider router={routes}></RouterProvider>
 </LoginProvider>
);


