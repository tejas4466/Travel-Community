import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserJournals, deleteJournal } from '../store/journalSlice';
import { fetchChatMessages, deleteChatMessage } from '../store/chatSlice';
import { fetchResponses, deleteResponse } from '../store/responseSlice';
import journalService from '../appwrite/journal';
import communityService from '../appwrite/response';
import { deleteUser } from '../appwrite/deleteUser';
import { logout } from '../store/authSlice';
import { Edit, Trash2 } from 'react-feather';
import LoadingSpinner from '../components/LoadingSpinner';

function Profile() {
  const user = useSelector((state) => state.auth.userData);
  const journals = useSelector((state) => state.journal.journals);
  const messages = useSelector((state) => state.chat.messages);
  const responses = useSelector((state) => state.response.responses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingDeleteJournal, setIsLoadingDeleteJournal] = useState(false);
  const [isLoadingDeleteAccount, setIsLoadingDeleteAccount] = useState(false);

  useEffect(() => {
    dispatch(fetchUserJournals(user.$id));
    dispatch(fetchChatMessages());
    dispatch(fetchResponses());
  }, [dispatch, user.$id]);

  const handleJournalDelete = async (id) => {
    const userConfirm = window.confirm("Are you sure you want to delete?");
    if (!userConfirm) return;

    setIsLoadingDeleteJournal(true);
    try {
      const journal = journals.find((journal) => journal.$id === id);
      const images = journal.images;
      const deletePromises = images.map((image) => journalService.deleteFile(image));
      await Promise.all(deletePromises);
      await dispatch(deleteJournal(id)).unwrap();
      setIsLoadingDeleteJournal(false);
    } catch (error) {
      console.error('Error deleting journal', error);
    }
  };

  const handleAccountDelete = async () => {
    const userConfirm = window.confirm('Are you sure you want to delete your account?');
    if (!userConfirm) return;

    setIsLoadingDeleteAccount(true);
    const id = user.$id;

    try {
      // Delete user messages
      const userMessages = messages.filter((message) => message.userId === id);
      if (userMessages.length > 0) {
        await Promise.all(userMessages.map((message) => dispatch(deleteChatMessage(message.$id)).unwrap()));
      }

      // Delete user journals and their images
      const userJournals = journals.filter((journal) => journal.userId === id);
      if (userJournals.length > 0) {
        const userImages = userJournals.flatMap((journal) => journal.images);
        await Promise.all(userImages.map((imageId) => journalService.deleteFile(imageId)));
        await Promise.all(userJournals.map((journal) => dispatch(deleteJournal(journal.$id)).unwrap()));
      }

      // Delete user responses and their images
      const userResponses = responses.filter((response) => response.userId === id);
      if (userResponses.length > 0) {
        const userImages = userResponses.flatMap((response) => response.images);
        await Promise.all(userImages.map((imageId) => communityService.deleteFile(imageId)));
        await Promise.all(userResponses.map((response) => dispatch(deleteResponse(response.$id)).unwrap()));
      }

      // Delete user account
      await deleteUser(id);
      dispatch(logout());
      setIsLoadingDeleteAccount(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting account', error);
    }
  };

  return (
    <>
      {isLoadingDeleteJournal && <LoadingSpinner label="Deleting..." />}
      {isLoadingDeleteAccount && <LoadingSpinner label="Deleting your Account..." />}
      <div className="flex flex-col items-center justify-center p-6 text-white bg-gray-800">
        <div className="w-full max-w-4xl p-6 bg-gray-900 rounded-lg shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-center">Your Profile</h1>
          <p className="text-lg"><span className="font-semibold">Anonymous Name:</span> {user.name}</p>
          <p className="text-lg"><span className="font-semibold">Email Id:</span> {user.email}</p>
          <p className="text-lg"><span className="font-semibold">Created At:</span> {new Date(user.$createdAt).toLocaleDateString()}</p>
          <div className="flex flex-col mt-4 sm:flex-row sm:space-x-4 sm:justify-between">
            <Link to='/journalform' className='inline-block px-4 py-2 mb-2 font-semibold text-center text-white bg-blue-500 rounded-lg shadow-md sm:mb-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 hover:scale-105'>
              Create your Travel Memory
            </Link>
            <button
              className='px-4 py-2 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75'
              onClick={handleAccountDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <div className='w-full min-h-screen p-6 bg-gray-700 shadow-md'>
        <h1 className="mb-6 text-3xl font-bold text-center text-white">Your Travel Memories</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(journals) && journals.map((journal) => (
            <div key={journal.$id} className="p-4 bg-gray-900 rounded-lg shadow-md">
              <h2 className="mb-2 text-xl font-semibold text-white">{journal.title}</h2>
              <div className="flex items-center justify-between">
                <Link to={`/journal/${journal.$id}`} className='px-2 py-1 font-semibold text-white bg-green-500 rounded hover:bg-green-700'>View</Link>
                <div className="flex space-x-2">
                  <button 
                    className='p-2 text-white bg-red-500 rounded hover:bg-red-700'
                    onClick={() => handleJournalDelete(journal.$id)}
                  >
                    <Trash2 />
                  </button>
                  <Link to={`/updatejournal/${journal.$id}`} className='p-2 text-white bg-yellow-500 rounded hover:bg-yellow-700'>
                    <Edit />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
