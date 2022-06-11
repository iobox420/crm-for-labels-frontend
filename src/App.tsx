// @ts-nocheck
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import About from '@/pages/about/About'
import Registration from '@/pages/registration/Registration'
import Panel from '@/pages/panel/Panel'
import AdminPanel from '@/pages/adminpanel/AdminPanel'
import RequireArtist from '@/hoc/RequireArtist'
import RequireAdmin from './hoc/RequireAdmin'
import Redirect from '@/hoc/Redirect'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { extractAuthData } from '@/redux/authSlice'
import Artists from '@/pages/artists/Artists'
import ArtistContainer from '@/pages/artists-rtk-query/ArtistContainer'
import ArtistsTable from '@/pages/artists/Artists'
import NotActivated from '@/pages/not-activated/NotActivated'
import RequireNotActivated from '@/hoc/RequireNotActivated'
import Users from "@/pages/users/Users";

function App() {
  const dispatch = useDispatch()
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
              <Panel />
            </RequireArtist>
          }
        >
          <Route
            index
            element={
              <RequireArtist>
                <About />
              </RequireArtist>
            }
          />
          <Route
            path="about-me"
            element={
              <RequireArtist>
                <About />
              </RequireArtist>
            }
          />
          <Route
            path="my-contract"
            element={
              <RequireArtist>
                <>contract</>
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
            index
            element={
              <RequireAdmin>
                <Artists />
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
          <Route
            path="artists-rtk"
            element={
              <RequireAdmin>
                <ArtistContainer />
              </RequireAdmin>
            }
          />
        </Route>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route
          path="/your-account-not-activated"
          element={
       /*     <RequireNotActivated>
              <NotActivated />
            </RequireNotActivated>*/
            <NotActivated />
          }
        />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </div>
  )
}

export default App
