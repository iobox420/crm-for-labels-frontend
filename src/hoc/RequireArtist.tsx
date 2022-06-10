// @ts-nocheck
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireArtist = ({ children }) => {
  const auth = useSelector(({ auth }) => {
    return auth
  })
  const location = useLocation()
  if (!auth.isAuth) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  if (auth.user.role === 'admin') {
    return <Navigate to={'/admin-panel'} state={{ from: location }} />
  }
  if (auth.user.role === 'admin_not_activated') {
    return <Navigate to={'/your-account-not-activated'} state={{ from: location }} />
  }
  if (auth.user.role === 'artist') {
    return children
  }
}

export default RequireArtist
