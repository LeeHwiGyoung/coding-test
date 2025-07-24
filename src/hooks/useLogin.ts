'use client';
import { postLogin } from "@/api/endpoints/login";
import { useState } from "react";
import axios from "axios";

export function useLogin() {
    const [loading , setLoading] = useState<boolean>(false);
    const [error , setError] = useState<string|null>(null); 
    
    const login = async(email : string, password : string) => {
        setLoading(true);
        setError(null);
        try {
            const accessToken = await postLogin(email,password);
            localStorage.setItem('accessToken' , accessToken);
            console.log('로그인 성공');
        }
        catch(error) {
            if(axios.isAxiosError(error)){
                setError(error.message);
                console.error("로그인 실패" ,error)
            }
            localStorage.removeItem('accessToken');
        }
        finally {
            setLoading(false);    
        }
    }
    return {login , loading, error};
}
