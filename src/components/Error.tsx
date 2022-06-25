import React from 'react'
import IError, { TMessage } from "@/models/response/IError";
import { AxiosError } from "axios";

interface ErrorComponent  {
  message:string
}

const Error: React.FC<ErrorComponent> = ({ message }) => {

  return <div>{message}</div>
}

export default Error
