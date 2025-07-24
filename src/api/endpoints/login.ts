import { axiosInstance } from "../axios"

export const postLogin = async (email: string, password : string) =>{
    const res = await axiosInstance.post('/v2/users/login', {email , password});
    return res.data.accessToken;
}