import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import Login from './pages/login/Login'
import About from '@/pages/artist-panel-pages/about/About'
import Registration from '@/pages/registration/Registration'
import Panel from '@/pages/artist-panel-pages/Panel'
import AdminPanel from '@/pages/admin-panel-pages/AdminPanel'
import RequireArtist from '@/hoc/RequireArtist'
import RequireAdmin from './hoc/RequireAdmin'
import Redirect from '@/hoc/Redirect'
import React, { useEffect } from 'react'
import { extractAuthData } from '@/redux/authSlice'
import ArtistContainer from '@/pages/admin-panel-pages/artists-rtk-query/ArtistContainer'
import NotActivated from '@/pages/not-activated/NotActivated'
import Users from '@/pages/admin-panel-pages/users/Users'

import { useAppDispatch } from '@/redux/hooks'
import AboutReactQuery from '@/pages/artist-panel-pages/about-react-query/AboutReactQuery'
import Artists from '@/pages/admin-panel-pages/artists/Artists'
import MyContract from '@/pages/artist-panel-pages/my-contract-react-query/MyContract'
import CurrentArtist from './pages/admin-panel-pages/current-artist/CurrentArtist'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(extractAuthData())
  }, [dispatch])

  return (
    <div className="app-wrapper">
      <Routes>
        {/*<Route
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
                <AboutReactQuery />
              </RequireArtist>
            }
          />
          <Route
            path="key-about-me-react-query"
            element={
              <RequireArtist>
                <AboutReactQuery />
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
        </Route>*/}
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
                <div>index</div>
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
          {/*<Route path="users/:id" element={<RequireAdmin>
            <CurrentUser />
            </RequireAdmin>} />*/}

          <Route
            path="artists-rtk"
            element={
              <RequireAdmin>
                <ArtistContainer />
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
