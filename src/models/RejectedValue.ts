import IError from "@/models/response/IError";

export default interface RejectedValue {
  response: {
    data :IError
  }
}
