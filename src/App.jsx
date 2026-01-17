import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './page/homePage'
import LoginPage from './page/loginPage'
import RegisterPage from './page/registerPage'
import AdminHomePage from './page/adminPages/adminHomePage'

function App() {

  return (
    <BrowserRouter>
    <div className=''>
      <Routes path="/">
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/admin/*" element={<AdminHomePage/>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
