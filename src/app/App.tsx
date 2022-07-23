import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from '../pages/login/Login'
import Registration from '@/pages/registration/Registration'
import AdminPanel from '@/pages/admin-panel-pages/AdminPanel'
import Redirect from '@/hoc/Redirect'
import React, { useEffect } from 'react'
import { extractAuthData } from '@/processes/redux/authSlice'
import NotActivated from '@/pages/not-activated/NotActivated'
import { useAppDispatch } from '@/processes/redux/hooks'
import CurrentArtist from '../pages/admin-panel-pages/CurrentArtist'
import PanelPage from '../pages/artist-panel-pages/PanelPage'
import AboutPage from '../pages/artist-panel-pages/AboutPage'
import MyContractPage from '../pages/artist-panel-pages/MyContractPage'
import Artists from '@/pages/admin-panel-pages/artists/Artists'
import Users from '@/pages/admin-panel-pages/users/Users'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(extractAuthData())
  }, [dispatch])

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/panel/*" element={<PanelPage />}>
          <Route index element={<AboutPage />} />
          <Route path="about-me" element={<AboutPage />} />
          <Route path="my-contract" element={<MyContractPage />} />
          <Route path="acts" element={<>acts</>} />
        </Route>
        <Route path="/admin-panel/*" element={<AdminPanel />}>
          <Route path="artists/:id" element={<CurrentArtist />} />
          <Route index element={<div>index page</div>} />
          <Route path="artists" element={<Artists />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/your-account-not-activated" element={<NotActivated />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </div>
  )
}

export default App
