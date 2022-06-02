import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Redirect = () => {
  let navigate = useNavigate()
  useEffect(() => {
    navigate('/panel')
    console.log('navigate to /panel')
  })

  return <></>
}

export default Redirect
