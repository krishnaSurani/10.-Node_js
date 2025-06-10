import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../component/Login'
import Register from '../component/Register'
import Dashboard from '../component/dashboard'
import Form from '../component/Form'
import ShowProduct from '../component/showProduct'
import EditProduct from '../component/EditProduct'

function MainRouter() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/form' element={<Form></Form>}></Route>
          <Route path='/showproduct' element={<ShowProduct></ShowProduct>}></Route>
          <Route path='/editproduct/:id' element={<EditProduct></EditProduct>}></Route>
        </Routes>
    </div>
  )
}

export default MainRouter