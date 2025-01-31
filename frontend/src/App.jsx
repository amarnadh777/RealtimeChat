import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chatpage from './pages/chatPage/Chatpage'
import SignUpPage from './pages/signUpPage/SignUpPage'
import LoginPage from './pages/loginPage/LoginPage'
import Nopage from './pages/noPage/Nopage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protectedroutes from './routes/Protectedroutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<BrowserRouter>
<Routes>

  <Route  path='/signup'  element={<SignUpPage/>} />
 <Route path='/signin' element={<LoginPage/>}/>

  <Route   path='/' element={  <Protectedroutes> <Chatpage/>   </Protectedroutes>   }  />

  <Route path="*" element={<Nopage></Nopage>} />
</Routes>

</BrowserRouter>
 
     {/* <SignUpPage/> */}
     {/* <LoginPage/> */}
    </>
  )
}

export default App
