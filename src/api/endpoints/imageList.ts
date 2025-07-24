import { authInstance } from "../axios"

export const getImageList = async(caseId : string) =>{
    const res = await authInstance.get(`/v1/micro/cases/${caseId}`);
    return res.data.images;
}
