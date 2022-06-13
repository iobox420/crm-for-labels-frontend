import React from "react";
import { useAppSelector } from "@/hooks/redux";
import { Navigate } from "react-router-dom";


// @ts-ignore
const RequireNotActivated = ({ children}) => {
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
