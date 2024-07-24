import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import Button from '../components/Button';
import Contain from '../components/container/Contain';
import journalService from '../appwrite/journal';
import { useDispatch, useSelector } from 'react-redux';
import { createJournal } from '../store/journalSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { useState} from 'react';
import { useNavigate } from 'react-router';



function JournalForm() {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm();
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const create = async (data) => {
        setIsLoading(true)
        const newJournal = {
            title: data.title,
            images: [],
            userId: user.$id,
        };

        try {
            const imageFileIds = await Promise.all(
                Array.from(data.images).map(async (file) => {
                    const response = await journalService.uploadFile(file);
                    return response.$id;
                })
            );

            newJournal.images = imageFileIds;

            const response = await dispatch(createJournal(newJournal)).unwrap();
            if (response) {
                // alert("Journal created successfully");
                setIsLoading(false)
                // console.log(response);
                reset();
                navigate("/profile")
            }
        } catch (error) {
            console.error('Error creating journal:', error);
        }
    };

    return (
        <div className="flex justify-center min-h-screen pt-20 bg-gray-800">
            <Contain className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(create)} className='max-w-4xl p-6 mx-auto bg-white rounded-2xl'>
                    <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Create a New Travel Memory</h1>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="title">
                            Title
                        </label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Give a title to your memory"
                            {...register('title', {
                                required: true,
                            })}
                            className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="images">
                            Upload Images
                        </label>
                        <Input
                            type="file"
                            id="images"
                            multiple
                            accept="image/*"
                            {...register('images',{
                                required:true,
                            })}
                            className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="w-full px-8 py-4 font-bold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Create
                        </Button>
                    </div>
                    {
                        isLoading?(<LoadingSpinner label="Wait for few seconds..."/>):(null)
                    }
                </form>
            </Contain>
        </div>
    );
}

export default JournalForm;
