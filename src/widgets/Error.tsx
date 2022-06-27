import React from 'react'

interface ErrorComponent  {
  message:string
}

const Error: React.FC<ErrorComponent> = ({ message }) => {

  return <div>{message}</div>
}

export default Error
