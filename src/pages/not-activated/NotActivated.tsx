import React from 'react'
import { logout } from '@/redux/authSlice'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button, Typography } from 'antd'
import { Navigate, useNavigate } from "react-router-dom";
const { Title } = Typography;

const NotActivated = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    // @ts-ignore
    dispatch(logout())
    setTimeout(() => {
      navigate('/login', { replace: true })
    },500)
  }

  return <div className={'dflex aicenter jccenter fdcolumn hvh100'}>
    <Title>Your account not activated</Title>
    <Button type="primary" onClick={handleLogout}>Logout</Button>
  </div>
}

export default NotActivated
