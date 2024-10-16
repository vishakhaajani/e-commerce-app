import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!email || !password){
            alert("Form can't be empty!");
            return false;
        }

        try{
            const response = await axios.get("http://localhost:5000/userLogin");
            const all = response.data;
            const user = all.find(user => user.email === email && user.password === password);
            if(user){
                alert("Login successfully!");
                navigate("/home");
            }else{
                alert("Invalid email or password!");
            }
            setEmail("");
            setPassword("");
        }catch(err){
            console.log(err);
            return false;    
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-cyan-800'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
                <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
                <form onSubmit={handleLogin}>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Password */}
                    <div className='mb-4'>
                        <label htmlFor="password" className='block text-gray-700 font-medium mb-2'>Password</label>
                        <input
                            type="password"
                            id='password'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full text-white bg-cyan-800 hover:bg-cyan-900 transition font-semibold py-2 rounded-lg duration-300'>
                        Login
                    </button>
                    <p className='text-center mt-4'>Don't have an account? <NavLink to={'/'} className={'text-cyan-900'}>Signup</NavLink> </p>
                </form>
            </div>
        </div>
  )
}

export default Login