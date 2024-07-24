import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { fetchUserJournals, updateJournal } from '../store/journalSlice';
import Button from '../components/Button';
import journalService from '../appwrite/journal';
import { useNavigate } from 'react-router';

function UpdateJournal() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const journals = useSelector((state) => state.journal.journals);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      newImages: []
    },
  });

  const [selectedImages, setSelectedImages] = useState(new Set());

  useEffect(() => {
    if (user && user.$id) {
      dispatch(fetchUserJournals(user.$id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (journals && id) {
      const journal = journals.find((journal) => journal.$id === id);
      if (journal) {
        reset({
          title: journal.title,
          newImages: [] // Reset new images
        });
      }
    }
  }, [journals, id, reset]);

  const journal = journals.find((journal) => journal.$id === id);
  let imageUrls = [];

  if (journal && journal.images) {
    imageUrls = journal.images.map((imageId) => ({
      id: imageId,
      url: journalService.getFileView(imageId).href
    }));
  }

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
      const tempImages = journal.images.filter((imageId) => !fileIds.includes(imageId));

      // Delete selected images
      if (fileIds.length > 0) {
        await Promise.all(fileIds.map((fileId) => journalService.deleteFile(fileId)));
        // alert("Selected files deleted");
      }

      // Upload new images
      const imageFileIds = await Promise.all(
        Array.from(data.newImages).map(async (file) => {
          const response = await journalService.uploadFile(file);
          return response.$id;
        })
      );

      const updatedJournal = {
        title: data.title,
        images: [...tempImages, ...imageFileIds],
        userId: user.$id,
      };

      const response = await dispatch(updateJournal({ id, updatedJournal })).unwrap();
      if (response) {
        // alert("Changes updated successfully");
        navigate("/profile");
      }

    } catch (error) {
      console.error("Error updating journal", error);
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
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Update Your Travel memory</h2>
        <form onSubmit={handleSubmit(update)} className="space-y-6">
          <Input
            type="text"
            id="title"
            label="Title:"
            {...register('title', { required: true })}
            className="w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Select images you want to delete</h2>
            <div className="grid grid-cols-1 gap-4 overflow-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {imageUrls.map(({ id, url }, index) => (
                <div key={id} className="relative cursor-pointer">
                  <img
                    src={url}
                    alt={`Journal Image ${index + 1}`}
                    className="object-cover w-full rounded-md h-36"
                    onClick={() => handleImageClick(id)}
                  />
                  <input
                    type="checkbox"
                    id={`checkbox-${id}`}
                    checked={selectedImages.has(id)}
                    onChange={() => handleCheckboxChange(id)}
                    className="absolute top-2 right-2"
                  />
                </div>
              ))}
            </div>
            <label htmlFor="newImages" className="block mt-2 mb-2 text-sm font-bold text-gray-700">Add more images:</label>
            <input
              type="file"
              id="newImages"
              multiple
              accept="image/*"
              {...register('newImages', { valueAsArray: true })}
              className="w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateJournal;
