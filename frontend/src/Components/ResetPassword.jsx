import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../services/UserService'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

function ResetPassword() {
    let { token } = useParams()
    let navigate = useNavigate()

    let {register,handleSubmit,formState: {errors}} = useForm()

    const [password, setpassword] = useState('')

    async function handleResetPassword(data) {
        let resetPasswordRes = await resetPassword(token,data.password)
        if(resetPasswordRes.status === 200) {
            toast.success("Password Reset Successfully")
            navigate("/login")
        }
    }

    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            <h1 className='text-3xl font-semibold mb-5'>Reset Password</h1>
            <form onSubmit={handleSubmit(handleResetPassword)}>
                <input {...register("password",{
                required: true,
                minLength: 8
                })} value={password} onChange={e => setpassword(e.target.value)} className='px-3 py-2 bg-zinc-700 outline-none' type="password" placeholder='New Password' name='password' />
                {errors.password && <p className='text-red-500'>Password is required and must be at least 8 characters</p>}
                <button className='px-3 py-2 bg-blue-600 rounded-lg  ml-4' type='submit'>
                    Reset
                </button>
            </form>
        </div>
    )
}

export default ResetPassword
