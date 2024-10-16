import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegistration = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert('Form cannot be empty!');
            return false;
        }

        // Get the current list of users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Create new user object
        let newUser = {
            id: Math.floor(Math.random() * 10000),
            name,
            email,
            password
        };

        // Check if the user already exists
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("User with this email already exists!");
            return;
        }

        // Add new user to the list and save it back to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Reset form and navigate to login page
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-cyan-800'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
                <h2 className='text-2xl font-bold text-center mb-6'>Registration</h2>
                <form onSubmit={handleRegistration}>
                    {/* Username */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Enter your username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        Register
                    </button>
                    <p className='text-center mt-4'>Already have an account? <NavLink to={'/login'} className={'text-cyan-900'}>Login</NavLink> </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;
