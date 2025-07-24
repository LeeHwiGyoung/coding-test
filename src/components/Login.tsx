'use client';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function Login() {
  const [email , setEmail] = useState<string>("");
  const [password , setPassword] = useState<string>("");
  const {loading , error , login } = useLogin();
  const router = useRouter();
  const onChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const onChangePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const onSubmitForLogin = async(event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
    router.push('/image_list')
  }

  return (
    <article>
        <form
          className='flex flex-col max-w-[50%]'  
          onSubmit={onSubmitForLogin}>
            <input
             className='border'
             type='email'
             value={email}
             onChange={onChangeEmail}/>
            <input
             className='border'
             type='password'
             value={password}
             onChange={onChangePassword} 
            />
            <button
             className='border p-4'
             type='submit' 
            >
                로그인
            </button>
         </form>
    </article>
  )
}
