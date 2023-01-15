import ExperienceList from './ExperienceList'
import LineList from './LineList'
import UserList from './UserList'
import Navigation from './Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button'

function App() {
  return (
    <div className='App'>
      <Menubar className='m-3 bg-black-alpha-20 shadow-5' 
        start={<h3>Transport Feedback</h3>}
        end={<div>
          <Button label="Logout" icon="pi pi-power-off"/>
        </div>}
      />
      <div className="grid">
        <div className="col-2">
          <Navigation />
        </div>
        <div className="col-10">
          <BrowserRouter>
            <Routes>
              <Route path='/experiences' element={<ExperienceList />} />
              <Route path='/lines' element={<LineList />} />
              <Route path="/users" element={<UserList />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App
