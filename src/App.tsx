import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Panel from './pages/panel/Panel'
import Page404 from '@/pages/about/About'
import Redirect from '@/components/Redirect'
import Registration from '@/pages/registration/Registration'

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/panel/*" element={<Panel />}>
          <Route index element={<>index element page</>} />
          <Route path="profile" element={<>profile</>} />
          <Route path="contract" element={<>contract</>} />
          <Route path="acts" element={<>acts</>} />
        </Route>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  )
}

export default App
