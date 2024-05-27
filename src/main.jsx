import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Employe from './components/Employe.jsx'
import Items from './components/Items.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import SignIn from './components/SignIn.jsx'
import Attendance from './components/Attendence.jsx'
import './App.css'
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/login' element={<SignIn/>}/>


    <Route element={<PrivateRoutes/>}>
    <Route path='/' element={<App/>}>
       <Route path='employe' element={<Employe/>} />
       <Route path='items' element={<Items/>} />
       <Route path='attendance' element={<Attendance/>} />
       
    </Route>
    </Route>
    </>
  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/> 
  </React.StrictMode>,
)
