import {Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'


const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      /*AQUI DEBE DE IR LA CONEXION A LA INFORMACION */
    </Routes>    
  )
}

export default RoutesIndex