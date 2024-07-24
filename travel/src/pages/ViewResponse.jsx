import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchResponses } from '../store/responseSlice';
import communityService from '../appwrite/response';
import LoadingSpinner from '../components/LoadingSpinner';

function ViewResponse() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const response = useSelector((state) =>
    state.response.responses.find((response) => response.$id === id)
  );

  useEffect(() => {
    dispatch(fetchResponses());
  }, [dispatch]);

  if (!response) {
    return <LoadingSpinner label="Loading..." />;
  }

  const images = response.images || [];
  const imageViewUrls = images.map((imageId) => communityService.getFileView(imageId).href);

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const renderStars = (rate) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rate ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.21c.969 0 1.372 1.24.588 1.81l-3.416 2.481a1 1 0 00-.363 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118l-3.416-2.481a1 1 0 00-1.176 0l-3.416 2.481c-.785.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.363-1.118L2.265 9.393c-.784-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.966z" />
      </svg>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-gray-900">
      <main className="flex-1 w-full p-6 mx-auto bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center">{response.touristPlaceName}</h2>
        <div className="space-y-4">
          <p className="text-lg">
            <strong className="font-semibold">Location:</strong> {response.location}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Time of Travel:</strong> {new Date(response.timeOfTravel).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Experience:</strong> {response.experience}
          </p>
          <div className="flex items-center">
            <p className="text-lg">
              <strong className="font-semibold">Rating (out of 5):</strong>
            </p>
            <div className="flex ml-2">{renderStars(response.rate)}</div>
          </div>
          <p className="text-lg">
            It is a <strong>{response.inference}</strong> place to visit.
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Best Month to Visit:</strong> {response.bestMonth}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Stay and Food:</strong> {response.stayAndFood}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Problems Faced:</strong> {response.problems}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Suggestions:</strong> {response.suggestions}
          </p>
        </div>
        {images.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-2xl font-semibold">Images:</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {imageViewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => handleImageClick(url)}
                >
                  <img
                    src={url}
                    alt={`Response Image ${index + 1}`}
                    className="object-cover w-full rounded-md h-36 sm:h-48 md:h-56 lg:h-64"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl max-h-screen p-4 bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute text-xl font-bold text-gray-800 top-2 right-2"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected media"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewResponse;
