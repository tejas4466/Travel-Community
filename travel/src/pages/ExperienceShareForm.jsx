import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Contain from '../components/container/Contain';
import communityService from '../appwrite/response';
import { createResponse } from '../store/responseSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const ExperienceShareForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true)
    data.rate = parseInt(data.rate, 10);
    const newResponse = {
      touristPlaceName: data.touristPlaceName,
      location: data.location,
      timeOfTravel: data.timeOfTravel,
      experience: data.experience,
      rate: data.rate,
      inference: data.inference,
      bestMonth: data.bestMonth,
      problems: data.problems,
      stayAndFood: data.stayAndFood,
      suggestions: data.suggestions,
      images: [],
      userId: user.$id,
      userName: user.name,
    };

    try {
      const imageFileIds = await Promise.all(
        Array.from(data.images).map(async (file) => {
          const response = await communityService.uploadFile(file);
          return response.$id;
        })
      );
      newResponse.images = imageFileIds;

      const response = await dispatch(createResponse(newResponse)).unwrap();

      if (response) {
        // alert('Form data submitted successfully!');
        setIsLoading(false)
        reset();
        navigate("/community")
      } else {
        console.error('Failed to submit form data.');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-800">
      <Contain>
        <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Share your Travel Experience</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Tourist Place Name"
              type="text"
              {...register('touristPlaceName', { required: true })}
              error={errors.touristPlaceName}
            />
            <Input
              label="Located At"
              type="text"
              {...register('location', { required: true })}
              error={errors.location}
            />
            <Input
              label="Time of Travel"
              type="date"
              {...register('timeOfTravel', { required: true })}
              error={errors.timeOfTravel}
            />
            <Input
              label="Share your experience in short talk about the speciality of the place you visited and some must visit hidden gems of that place(atleast in 3-4 lines)"
              type="textarea"
              {...register('experience', { required: true })}
              error={errors.experience}
            />
            <Input
              label="Rate (out of 5)"
              type="number"
              {...register('rate', { required: true })}
              error={errors.rate}
            />
            <Select
              label="How was the Tourist Place according to you?"
              options={['Select...', 'MustVisit', 'HighlyRecommended', 'Decent', 'Average', 'Satisfactory', 'Mediocre', 'NotSuggested']}
              {...register('inference', { required: true })}
              error={errors.inference}
            />
            <Select
              label="Best Month to Visit the Place"
              options={['Select...', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
              {...register('bestMonth', { required: true })}
              error={errors.bestMonth}
            />
            <Input
              label="What kind of problems did you face there (if any)?"
              type="textarea"
              {...register('problems')}
            />
            <Input
              label="Any suggestions for the future travelers?"
              type="textarea"
              {...register('suggestions')}
            />
            <Select
              label="How was the Stay and Food?"
              options={['Select...', 'Excellent', 'Expensive', 'Good', 'Average', 'Poor', 'Decent', 'Affordable']}
              {...register('stayAndFood', { required: true })}
              error={errors.stayAndFood}
            />
            <Input
              label="Upload Images(select all images at one time and don't share personal images)"
              type="file"
              {...register('images')}
              accept="image/*"
              multiple
            />
            <Button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700">
              {isLoading && <LoadingSpinner label="Wait for few seconds..." />}
              Submit your Responses
            </Button>
          </form>
        </div>
      </Contain>
    </div>
  );
};

export default ExperienceShareForm;
