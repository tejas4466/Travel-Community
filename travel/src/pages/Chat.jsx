import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchChatMessages, createChatMessage, deleteChatMessage, subscribeToChatMessages } from '../store/chatSlice';
import { Trash2 } from 'react-feather';

const Chat = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector((state) => state.auth.userData);
  const messages = useSelector((state) => state.chat.messages);
  const chatStatus = useSelector((state) => state.chat.status);
  const chatError = useSelector((state) => state.chat.error);

  useEffect(() => {
    dispatch(fetchChatMessages());
    dispatch(subscribeToChatMessages());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const newMessage = {
      userId: user.$id,
      userName: user.name,
      content: data.message,
    };
    try {
      const response = await dispatch(createChatMessage(newMessage)).unwrap();
      if (response) {
        reset();
      }
    } catch (error) {
      console.error('Error creating chat message:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await dispatch(deleteChatMessage(messageId)).unwrap();
    } catch (error) {
      console.error('Error deleting chat message:', error);
    }
  };

  if (!user) {
    alert('Login to chat with the community');
    return null;
  }

  return (
    <div className="container min-h-screen p-4 mx-auto bg-gray-800">
      <h1 className="mb-4 text-2xl font-bold text-center text-white">Chat with the Community</h1>
      <div className="max-w-2xl p-4 mx-auto mb-4 rounded-lg shadow-md bg-gray-950 bg-opacity-80">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2">
          <input
            type="text"
            {...register('message', { required: true })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Say something..."
          />
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Send</button>
        </form>
      </div>
      <div className="max-w-2xl mx-auto space-y-4">
        {chatStatus === 'loading' && <p className="text-white">Loading messages...</p>}
        {chatStatus === 'failed' && <p className="text-white">Error: {chatError}</p>}
        {messages.map((message) => (
          <div key={message.$id} className="flex justify-between p-4 bg-gray-900 rounded-lg shadow-md">
            <div>
              <p className="text-sm text-white"><strong>{message.userName}</strong></p>
              <p className="text-xs text-white"><strong>{new Date(message.$createdAt).toLocaleDateString()} {new Date(message.$createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></p>
              <p className="mt-2 text-white">{message.content}</p>
            </div>
            {user && user.$id === message.userId && (
              <button
                onClick={() => handleDeleteMessage(message.$id)}
                className="h-8 px-2 mt-1 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                <Trash2 />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
