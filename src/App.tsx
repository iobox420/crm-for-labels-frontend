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
import { extractAuthData } from '@/redux/authSlice'
import Artists2 from '@/pages/artists/Artists2'
import ArtistContainer from '@/pages/artists-rtk-query/ArtistContainer'
import NotActivated from '@/pages/not-activated/NotActivated'
import Users from '@/pages/users/Users'
import MyContract from '@/pages/my-contract/MyContract'
import { useAppDispatch } from '@/hooks/redux'

import Artists from "@/pages/artists/Artists";

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
                <MyContract />
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
{/*          <Route
            path="test"
            element={
              <RequireAdmin>
                <Test />
              </RequireAdmin>
            }
          />*/}
{/*          <Route
            path="test2"
            element={
              <RequireAdmin>
                <Artists />
              </RequireAdmin>
            }
          />*/}
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
