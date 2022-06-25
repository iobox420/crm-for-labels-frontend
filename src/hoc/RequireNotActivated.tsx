import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";


const RequireNotActivated = ({ children}: any) => {
  const auth = useAppSelector(({ auth }) => {
    return auth
  })
  if(!auth.isAuth){
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  if (auth.user.role === 'admin_not_activated') {
    return children
  }
}

export default RequireNotActivated
