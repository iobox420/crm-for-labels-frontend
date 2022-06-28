import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { getResCountRows } from "@/processes/models/response/getResCountRows";
import { IArtist } from "@/processes/models/IArtist";
import IError from "@/processes/models/response/IError";
import AdminService from "@/processes/services/AdminService";

function useArtists (){
  return useQuery<
    AxiosResponse<getResCountRows<IArtist[]>>,
    AxiosError<IError>
    >('admin/get-artists', () => AdminService.getArtists({ page: 1, limit: 10 }))
}

export default useArtists
