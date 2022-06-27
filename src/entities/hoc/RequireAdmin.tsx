import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRoot } from '@/processes/redux/store'
interface IRequireAdmin {
  children:React.ReactNode;
}
const RequireAdmin: React.FC<IRequireAdmin> = ({ children }: any) => {

  const auth = useSelector(({ auth }: IRoot) => {
    return auth
  })
  const location = useLocation()
  if (!auth.isAuth) {
    console.log('navigate to /login');
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  if (auth.user.role === 'artist') {
    console.log('navigate to /panel');
    return <Navigate to={'/panel'} state={{ from: location }} />
  }
  if (auth.user.role === 'admin_not_activated') {
    console.log('navigate to /your-account-not-activated');
    return <Navigate to={'/your-account-not-activated'} state={{ from: location }} />
  }
  if (auth.user.role === 'admin') {
    console.log('return children');
    return children
  }
}

export default RequireAdmin
