import { authInstance } from "../axios"

export const getSeconds = async(imageId:string) => {
    const res = await authInstance.get(`/v1/timer/${imageId}`)
    if(!res.data) {
        return 0
    }
    return res.data.seconds;
}

export const postSeconds = async(imageId: string , seconds : string) => {
    const res = await authInstance.post('/v1/timer', {imageId ,  seconds});
    console.log(res);
}