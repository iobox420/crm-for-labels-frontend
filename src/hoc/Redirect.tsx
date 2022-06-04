// @ts-nocheck
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Redirect = () => {
  console.log('redirect')
  const auth = useSelector(({ auth }) => {
    return auth
  })
  const location = useLocation()
  console.log('RedirectAfterLogin')
  if (auth.isAuth && auth.user.role === 'artist') {
    return <Navigate to={'/panel'} state={{ from: location }} />
  }
  if (auth.isAuth && auth.user.role === 'admin') {
    return <Navigate to={'/admin-panel'} state={{ from: location }} />
  }
  if (!auth.isAuth) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }
}

export default Redirect
