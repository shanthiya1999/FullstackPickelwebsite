import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
// import Carousel1 from './Carousel'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import Pickle from './Pickle'
import Carousel1 from './Carousel'
import ViewCart from './ViewCart'
import About from './About'
import Login from './Login'
import Register from './Register'
import Account from './Account'
import AdminDashboard from './AdminDashboard'
function App() {
  

  return (
    <>
   <Navbar />
    <Routes>
      <Route path="/" element={
         <Carousel1/>
        
         
        } />
      <Route path="/pickles" element={<Pickle />} />
      <Route path='/viewcart' element={<ViewCart />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/account' element={<Account />} />
      <Route path='/admin' element={<AdminDashboard />} />
    </Routes>
    </>
  )
}

export default App
