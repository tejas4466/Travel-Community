import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import authService from '../appwrite/auth';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        navigate('/login');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const password = watch('password', ''); 

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-center text-white">Create Account</h2>
      {error && <p className="text-center text-red-600">{error}</p>}
      <form onSubmit={handleSubmit(create)} className="space-y-4">
        <div>
          <Input
            label="Anonymous Name: "
            type="text"
            placeholder="Create an anonymous name"
            {...register("name", {
              required: true,
            })}
          />
        </div>
        <div>
          <Input
            label="Email: "
            type="email"
            placeholder="Enter your email (Prefer Gmail Id)"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email address must be a valid address",
              },
            })}
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <div>
          <Input
            label="Confirm Password: "
            type="password"
            placeholder="Confirm your password"
            {...register("passwordConfirmation", {
              required: true,
              validate: value =>
                value === password || "The passwords do not match"
            })}
          />
          {errors.passwordConfirmation && <p className="text-red-600">{errors.passwordConfirmation.message}</p>}
        </div>
        <Button
          type="submit"
          className="w-full hover:bg-blue-600"
          bgColor="bg-blue-700"
          textColor="text-white"
        >
          Sign Up
        </Button>
        <p className="mt-2 text-base text-center text-white">
          Already have an account?&nbsp;
          <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
