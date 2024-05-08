import React from 'react'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { Inicio } from '../components/pages/Inicio';
import { Carta } from '../components/pages/Carta';
import { Vinos } from '../components/pages/Vinos';
import { Catering } from '../components/pages/Catering';
import { Reserva } from '../components/pages/Reserva';
import { Login } from '../components/pages/Login';
import { Header } from '../components/layout/Header';


export const Routing = () => {
  return (
    <BrowserRouter>
      
      <Header />

      <Routes>
          <Route index path='/' element={<Inicio />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/carta' element={<Carta />} />
          <Route path='/vinos' element={<Vinos />} />
          <Route path='/catering' element={<Catering />} />
          <Route path='/reservas' element={<Reserva />} />
          <Route path='/login' element={<Login />} />

          <Route path='/*' element={
            <>
              <h1>Esta página no existe</h1>
              <Link to='/inicio'>Volver a inicio</Link>              
            </>
          } >
          </Route>
      </Routes>
    </BrowserRouter>
  )
}
