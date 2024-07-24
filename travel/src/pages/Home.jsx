import React from 'react';
import backgroundImage from '../assets/travelBg.avif'; 

const Home = () => {
  return (
    <div className="relative min-h-screen text-gray-100 bg-gray-900">
      {/* Background Image Section */}
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Centered Welcome and About Section */}
          <div className="relative flex items-center justify-center min-h-screen p-6">
            <div className="relative z-10 max-w-6xl p-6 text-center rounded-lg">
              <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
                Welcome to travelers.comm
              </h1>
              <section className="mb-12">
                <p className="text-base font-medium leading-relaxed text-gray-900 md:text-lg">
                  travelers.comm is a web-based anonymous Travelers and Tourists Community where you can discover, share your travel experiences and tourist place insights you visited, and connect with fellow adventurers while safeguarding your privacy. Immerse yourself in a community of like-minded travelers, and keep your travel memories alive.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-12 bg-white">
        <div className="container px-6 mx-auto">
          <h2 className="mb-8 text-3xl font-semibold text-center text-gray-900">Features</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col w-full max-w-xs p-6 text-gray-900 bg-gray-300 rounded-lg shadow-xl">
              <h3 className="mb-2 text-lg font-bold">Share Your Experiences</h3>
              <p>Anonymously share travel stories with the community.</p>
            </div>
            <div className="flex flex-col w-full max-w-xs p-6 text-gray-900 bg-gray-300 rounded-lg shadow-xl">
              <h3 className="mb-2 text-lg font-bold">Community Responses</h3>
              <p>Engage with shared experiences from travelers in the community.</p>
            </div>
            <div className="flex flex-col w-full max-w-xs p-6 text-gray-900 bg-gray-300 rounded-lg shadow-xl">
              <h3 className="mb-2 text-lg font-bold">Chat with the Community</h3>
              <p>Connect and chat anonymously with other community users.</p>
            </div>
            <div className="flex flex-col w-full max-w-xs p-6 text-gray-900 bg-gray-300 rounded-lg shadow-xl">
              <h3 className="mb-2 text-lg font-bold">Personal Travel Memories</h3>
              <p>Store your personal travel memories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="relative py-12 bg-gray-800">
  <div className="container px-6 mx-auto">
    <h2 className="mb-8 text-3xl font-semibold text-center text-white">Purpose</h2>
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col w-full max-w-4xl p-8 text-center text-gray-300 bg-gray-700 rounded-lg shadow-lg">
        <p className="text-base text-gray-200 md:text-lg">
          To empower everyone to explore the travel community, connect with others, get to know their experiences regarding the tourist places they visited, and freely share their travel adventures while preserving their privacy.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Terms and Conditions Section */}
      <section className="relative py-12 bg-white">
        <div className="container px-6 mx-auto">
          <h2 className="mb-8 text-3xl font-semibold text-center text-gray-900">Terms and Conditions</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col w-full max-w-md p-6 text-center text-gray-900 bg-gray-300 rounded-full shadow-xl">
              <h3 className="mb-2 text-lg font-bold">Authenticity</h3>
              <p>Please refrain from posting fake or misleading content. All shared experiences should reflect genuine travel experiences.</p>
            </div>
            <div className="flex flex-col w-full max-w-md p-6 text-center text-gray-900 bg-gray-300 rounded-full shadow-xl">
              <h3 className="mb-2 text-lg font-bold">Respectful Engagement</h3>
              <p>Maintain a respectful and positive environment. Do not share abusive, offensive, or harmful content.</p>
            </div>
            <div className="flex flex-col w-full max-w-md p-6 text-center text-gray-900 bg-gray-300 rounded-full shadow-xl">
              <h3 className="mb-2 text-lg font-bold">Privacy</h3>
              <p>Protect your privacy and the privacy of others. Avoid sharing personal information that could compromise anonymity.</p>
            </div>
            <div className="flex flex-col w-full max-w-md p-6 text-center text-gray-900 bg-gray-300 rounded-full shadow-xl">
              <h3 className="mb-2 text-lg font-bold">Community Guidelines</h3>
              <p>Adhere to the community guidelines to ensure a safe and enjoyable experience for all users.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
