import React from 'react'
import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'

import Login from './pages/Login'
import Register from './pages/Register'
import Story from './component/Story'
import StoryDetails from './component/StoryDetails'
import Home from './pages/Home'
import { PaymentComponent } from './component/PaymentComponent'
const App = () => {
  return (
   <>
   {/* <PaymentComponent/> */}
   <Navbar />
   <Routes>
   <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/stories' element={<Story/>}/>
      <Route path="/story/:id" element={<StoryDetails />} />

     
    </Routes>
   </>
  )
}

export default App
