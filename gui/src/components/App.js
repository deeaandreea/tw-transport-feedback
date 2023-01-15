import ExperienceList from './ExperienceList'
import LineList from './LineList'
import UserList from './UserList'
import UserLogin from './UserLogin'
import UserRegister from './UserRegister'
import Navigation from './Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'

const handleRegister = (rowData) => {
  window.location.href = '/register'
}

const handleLogin = (rowData) => {
  window.location.href = '/login'
}

function App() {
  return (
    <div className='App'>
      <Menubar className='m-3 bg-black-alpha-20 shadow-5' 
        start={<h3 className='m-3'>Transport Feedback</h3>}
        end={<div>
          <Button label="Register" visible={true} icon="pi pi-user-edit" className='m-1' onClick={handleRegister} />
          <Button label="Login" visible={true} icon="pi pi-sign-in" className='m-1' onClick={handleLogin} />
          <Button label="Logout" visible={true} icon="pi pi-sign-out" className='m-1' />
        </div>}
      />
      <div className="grid">
        <div className="col-2">
          <Navigation />
        </div>
        <div className="col-10">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<ExperienceList />} />
              <Route path='/experiences' element={<ExperienceList />} />
              <Route path='/lines' element={<LineList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<UserRegister />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
