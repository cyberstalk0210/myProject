import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/dashboard";
import ProductTable from "./components/productTables";
// import Messages from "./components/message";
import PrivateRoute from "./PrivateRoutes";
import Register from './components/register';
import Orders from './components/orders';
import AddProduct from './components/addProduct';
import EditProduct from './components/editProduct';
import DeleteProduct from './components/deleteProduct';
import UsersTable from './components/usersTable';
import UserEdit from './components/userEdit';
import UserDelete from './components/userDelete';
import BuyProducts from './components/buyComponent';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />

      {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/users" element={<UsersTable/>} />
        <Route path="/orders" element={<Orders/>} />
        
        <Route path="users/edit/:id" element={<UserEdit />} />
        <Route path="users/delete/:id" element={<UserDelete />} />
        
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/delete/:id" element={<DeleteProduct />} />
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path="/buy-products" element={<BuyProducts />} />
      {/* </Route> */}
    </Routes>
  );
}

export default AppRoutes;
