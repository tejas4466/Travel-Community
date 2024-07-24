import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { fetchResponses, updateResponse } from '../store/responseSlice';
import Button from '../components/Button';
import communityService from '../appwrite/response';
import { useNavigate } from 'react-router';
import Select from '../components/Select';
import Contain from '../components/container/Contain';

function UpdateResponse() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const responses = useSelector((state) => state.response.responses);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      touristPlaceName: '',
      location: '',
      timeOfTravel: '',
      experience: '',
      rate: 0,
      inference: '',
      bestMonth: '',
      suggestions: '',
      newImages: [],
      problems: '',
      stayAndFood: ''
    },
  });

  const [selectedImages, setSelectedImages] = useState(new Set());

  useEffect(() => {
    if (user && user.$id) {
      dispatch(fetchResponses());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (responses && id) {
      const response = responses.find((response) => response.$id === id);
      if (response) {
        reset({
          touristPlaceName: response.touristPlaceName,
          location: response.location,
          timeOfTravel: response.timeOfTravel,
          experience: response.experience,
          rate: response.rate,
          inference: response.inference,
          bestMonth: response.bestMonth,
          suggestions: response.suggestions,
          newImages: [],
          problems: response.problems,
          stayAndFood: response.stayAndFood
        });
      }
    }
  }, [responses, id, reset]);

  const response = responses.find((response) => response.$id === id);
  const imageUrls = response && response.images
    ? response.images.map((imageId) => ({
        id: imageId,
        url: communityService.getFileView(imageId).href
      }))
    : [];

  const handleImagesDelete = () => {
    const fileIds = Array.from(selectedImages);
    if (fileIds.length === 0) {
      // alert("No images selected for deletion.");
      return [];
    }
    setSelectedImages(new Set());
    return fileIds;
  };

  const update = async (data) => {
    try {
      const userConfirm = window.confirm("Are you sure you want to make changes?");
      if (!userConfirm) return;

      const fileIds = handleImagesDelete();
      const tempImages = response ? response.images.filter((imageId) => !fileIds.includes(imageId)) : [];

      if (fileIds.length > 0) {
        await Promise.all(fileIds.map((fileId) => communityService.deleteFile(fileId)));
      }

      const imageFileIds = await Promise.all(
        Array.from(data.newImages).map(async (file) => {
          const response = await communityService.uploadFile(file);
          return response.$id;
        })
      );

      const updatedResponse = {
        touristPlaceName: data.touristPlaceName,
        location: data.location,
        timeOfTravel: data.timeOfTravel,
        experience: data.experience,
        rate: data.rate,
        inference: data.inference,
        bestMonth: data.bestMonth,
        suggestions: data.suggestions,
        images: [...tempImages, ...imageFileIds],
        userId: user.$id,
        problems: data.problems,
        stayAndFood: data.stayAndFood,
        userName: user.name
      };

      const result = await dispatch(updateResponse({ id, updatedResponse })).unwrap();
      if (result) {
        navigate("/");
      }

    } catch (error) {
      console.error("Error updating response", error);
    }
  };

  const handleCheckboxChange = (imageId) => {
    setSelectedImages(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(imageId)) {
        newSelected.delete(imageId);
      } else {
        newSelected.add(imageId);
      }
      return newSelected;
    });
  };

  const handleImageClick = (imageId) => {
    handleCheckboxChange(imageId);
  };

  return (
    <div className="flex justify-center min-h-screen p-6 bg-gray-800">
      <Contain>
        <form onSubmit={handleSubmit(update)} className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Update Your Travel Response</h2>
          <Input
            type="text"
            id="touristPlaceName"
            label="Tourist Place Name:"
            {...register('touristPlaceName', { required: true })}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Input
            type="text"
            id="location"
            label="Location:"
            {...register('location', { required: true })}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Input
            type="date"
            id="timeOfTravel"
            label="Time of Travel:"
            {...register('timeOfTravel', { required: true })}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Input
            type="text"
            id="experience"
            label="Experience:"
            {...register('experience', { required: true })}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Input
            type="number"
            id="rate"
            label="Rate:"
            {...register('rate', { required: true })}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Select
            label="How is the Tourist Place according to you?"
            options={['Select...', 'MustVisit', 'HighlyRecommended', 'Decent', 'Average', 'Satisfactory', 'Mediocre', 'NotSuggested']}
            {...register('inference', { required: true })}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            error={errors.inference}
          />
          <Select
            label="Best Month to Visit the Place"
            options={['Select...', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
            {...register('bestMonth', { required: true })}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            error={errors.bestMonth}
          />
          <Input
            type="text"
            id="suggestions"
            label="Suggestions:"
            {...register('suggestions')}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Input
            type="text"
            id="problems"
            label="Problems:"
            {...register('problems')}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Select
            label="How was the Stay and Food?"
            options={['Select...', 'Excellent', 'Expensive', 'Good', 'Average', 'Poor', 'Decent', 'Affordable']}
            {...register('stayAndFood', { required: true })}
            className="w-full px-4 py-2 mb-4 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            error={errors.stayAndFood}
          />
          <div className="mb-4">
            {response.images &&
              <label className="block mb-2 text-sm font-bold text-gray-700">Select images if you want to delete any</label>
            }
            <div className="grid grid-cols-6 gap-4">
              {imageUrls.map(({ id, url }) => (
                <div key={id} className="relative">
                  <img
                    src={url}
                    alt="Response Image"
                    className={`cursor-pointer w-full h-auto ${selectedImages.has(id) ? 'border-2 border-blue-500' : ''}`}
                    onClick={() => handleImageClick(id)}
                  />
                  <input
                    type="checkbox"
                    checked={selectedImages.has(id)}
                    onChange={() => handleCheckboxChange(id)}
                    className="absolute top-2 right-2"
                    style={{ zIndex: 1 }}
                  />
                </div>
              ))}
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setValue('newImages', e.target.files)}
              className="mt-4"
            />
          </div>
          <Button type="submit" className="w-full py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700">
            Update Response
          </Button>
        </form>
      </Contain>
    </div>
  );
}

export default UpdateResponse;
