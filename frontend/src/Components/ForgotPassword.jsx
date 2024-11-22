import React, { useState } from 'react'
import { forgotPassword } from '../services/UserService'
import Message from './Message'
import { useNavigate,Link } from 'react-router-dom'

function ForgotPassword() {
    const [email, setemail] = useState('')
    const [resetUrl, setresetUrl] = useState('')
    const [resettoken, setresettoken] = useState('')
    async function handleForgotPassword(e) {
        e.preventDefault()
        let forgotPasswordRes = await forgotPassword(email)
        if(forgotPasswordRes.status === 200) {
            setresetUrl(forgotPasswordRes.data.resetUrl)
            setresettoken(forgotPasswordRes.data.resettoken)
        }
    }

    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            {
                resetUrl && resettoken ? <Message resetUrl = {resetUrl} resettoken = {resettoken} /> : <><h1 className='text-3xl font-semibold mb-5'>Enter Your Email</h1>
                    <>
                    <Link className = 'absolute text-blue-600 right-[5%]' to={'/login'}>Go to Login</Link>
                     <form onSubmit={handleForgotPassword}>
                    
                    <input className='px-3 py-2 bg-zinc-700 outline-none mr-4' value={email} onChange={e => setemail(e.target.value)} type="email" placeholder='Email' name='email'/>
                    <button className='px-3 py-2 bg-blue-600 rounded-lg' type='submit'>Get Link</button>
                </form>
                    </>
               </> 
            }
        </div>
    )
}

export default ForgotPassword
