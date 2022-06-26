import { Link, Route, Routes } from "react-router-dom";
import './App.css'
import Login from '../pages/login/Login'
import Registration from '@/pages/registration/Registration'
import AdminPanel from '@/pages/admin-panel-pages/AdminPanel'
import RequireAdmin from '../entities/hoc/RequireAdmin'
import Redirect from '@/entities/hoc/Redirect'
import React, { useEffect } from 'react'
import { extractAuthData } from '@/processes/redux/authSlice'
import NotActivated from '@/pages/not-activated/NotActivated'
import Users from '@/pages/admin-panel-pages/Users'
import { useAppDispatch } from '@/processes/redux/hooks'
import Artists from '@/pages/admin-panel-pages/Artists'
import CurrentArtist from '../pages/admin-panel-pages/CurrentArtist'
import PanelPage from '../pages/artist-panel-pages/PanelPage'
import RequireArtist from '../entities/hoc/RequireArtist'
import AboutPage from '../pages/artist-panel-pages/AboutPage'
import MyContractPage from '../pages/artist-panel-pages/MyContractPage'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(extractAuthData())
  }, [dispatch])

  return (
    <div className="app-wrapper">
      <Routes>
        <Route
          path="/panel/*"
          element={
            <RequireArtist>
              <PanelPage />
            </RequireArtist>
          }
        >
          <Route
            index
            element={
              <RequireArtist>
                <AboutPage />
              </RequireArtist>
            }
          />
          <Route
            path="about-me"
            element={
              <RequireArtist>
                <AboutPage />
              </RequireArtist>
            }
          />
          <Route
            path="my-contract"
            element={
              <RequireArtist>
                <MyContractPage />
              </RequireArtist>
            }
          />
          <Route
            path="acts"
            element={
              <RequireArtist>
                <>acts</>
              </RequireArtist>
            }
          />
        </Route>
        <Route
          path="/admin-panel/*"
          element={
            <RequireAdmin>
              <AdminPanel />
            </RequireAdmin>
          }
        >
          <Route
            path="artists/:id"
            element={
              <RequireAdmin>
                <CurrentArtist />
              </RequireAdmin>
            }
          />
          <Route
            index
            element={
              <RequireAdmin>
                <div><h1><Link to={'/admin-panel/artists/1'}>refresh</Link></h1></div>
                {/* <Navigate to={'artists'} state={{ from: location }} />*/}
              </RequireAdmin>
            }
          />
          <Route
            path="artists"
            element={
              <RequireAdmin>
                <Artists />
              </RequireAdmin>
            }
          />
          <Route
            path="users"
            element={
              <RequireAdmin>
                <Users />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="/users/:id" element={<CurrentArtist />} />
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
