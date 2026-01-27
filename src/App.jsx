import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './page/loginPage'
import RegisterPage from './page/registerPage'
import AdminHomePage from './page/adminPages/adminHomePage'
import { Toaster } from 'react-hot-toast'
import TheTest from './page/test'
import ClientPage from './page/ClientPages/ClientPage'

function App() {

  return (
    <BrowserRouter>
    <div className=''>
      <Toaster position='top-right'/>
      <Routes path="/">
          <Route path="/*" element={<ClientPage/>}/>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/admin/*" element={<AdminHomePage/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
