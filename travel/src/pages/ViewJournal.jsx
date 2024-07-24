import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserJournals } from '../store/journalSlice';
import journalService from '../appwrite/journal';
import LoadingSpinner from '../components/LoadingSpinner';


function ViewJournal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const { id } = useParams();
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    dispatch(fetchUserJournals(user.$id));
  }, [dispatch, user.$id]);

  const journal = useSelector((state) => state.journal.journals.find((journal) => journal.$id === id));
  
  if (!journal) {
    return <div className="mt-10 text-center"><LoadingSpinner label="Loading..."/></div>;
  }

  const images = journal.images || [];

  const imageViewUrls = images.map(imageId => journalService.getFileView(imageId).href);

  const handleMediaClick = (url, type) => {
    setSelectedMedia({ url, type });
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="w-full min-h-screen p-6 mx-auto bg-gray-800 shadow-md">
      <h1 className="mb-4 text-4xl font-bold text-center text-white">{journal.title}</h1>

      <div className="mt-10 mb-6">
        <div className="grid grid-cols-1 gap-4 overflow-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {imageViewUrls.map((url, index) => (
            <div key={index} className="relative cursor-pointer" onClick={() => handleMediaClick(url, 'image')}>
              <img src={url} alt={`Journal Image ${index + 1}`} className="object-cover w-full rounded-md h-36" />
            </div>
          ))}
        </div> 
      </div>

      

      {selectedMedia && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75" onClick={handleCloseModal}>
          <div className="relative p-4 bg-white rounded-md" onClick={(e) => e.stopPropagation()}>
            <button className="absolute h-10 font-bold text-black top-2 right-2" onClick={handleCloseModal}>X</button>
            {selectedMedia.type === 'image' && (
              <img src={selectedMedia.url} alt="Selected media" className="object-contain w-full max-h-screen" />
              
            ) }
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewJournal;
