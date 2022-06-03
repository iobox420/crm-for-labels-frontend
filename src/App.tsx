import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import About from '@/pages/about/About'
import Redirect from '@/components/Redirect'
import Registration from '@/pages/registration/Registration'
import Panel from '@/pages/panel/Panel'
import AdminPanel from '@/pages/adminpanel/AdminPanel'
import Users from '@/pages/users/Users'

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/panel/*" element={<Panel />}>
          <Route index element={<About />} />
          <Route path="about-me" element={<About />} />
          <Route path="my-contract" element={<>contract</>} />
          <Route path="acts" element={<>acts</>} />
        </Route>
        <Route path="/admin-panel/*" element={<AdminPanel />}>
          <Route index element={<Users />} />
        </Route>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="*" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
