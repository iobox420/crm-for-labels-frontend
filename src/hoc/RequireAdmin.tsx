import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRoot } from '@/redux/store'

const RequireAdmin = ({ children }: any) => {
  const auth = useSelector(({ auth }: IRoot) => {
    return auth
  })
  const location = useLocation()
  if (!auth.isAuth) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  if (auth.user.role === 'artist') {
    return <Navigate to={'/panel'} state={{ from: location }} />
  }
  if (auth.user.role === 'admin') {
    return children
  }
}

export default RequireAdmin
