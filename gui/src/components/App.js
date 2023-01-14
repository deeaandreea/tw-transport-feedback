import ExperienceList from './ExperienceList'
import LineList from './LineList'
import UserList from './UserList'
import Navigation from './Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className='App'>
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
