import { BrowserRouter,Routes, Route } from 'react-router-dom'

import Admin from './views/Admin/Admin'
import LogIn from './views/LogIn/LogIn'
import Signup from './views/Signup/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
