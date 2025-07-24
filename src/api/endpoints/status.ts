import { authInstance } from "../axios"

export const patchStatus = async(imageId : string , value : "waiting" | "completed" | "failed") => {
   const res = await authInstance.patch(`/v1/micro/images/${imageId}/status?status=${value}`)
   return res;
}