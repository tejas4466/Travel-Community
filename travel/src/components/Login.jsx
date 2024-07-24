import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({ userData }));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="mb-6 text-2xl font-bold text-center text-white">Login</h2>
            {error && <p className="text-center text-red-600">{error}</p>}
            <form onSubmit={handleSubmit(login)} className="space-y-4">
                <div>
                    <Input
                        label="Email: "
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    'Email address must be a valid address',
                            },
                        })}
                    />
                </div>
                <div>
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: true,
                        })}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full hover:bg-blue-600"
                    bgColor="bg-blue-700"
                    textColor="text-white"
                >
                    Sign in
                </Button>
            </form>
            <p className="mt-2 text-base text-center text-white">
                Don't have an account?&nbsp;
                <Link to="/signup">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;
