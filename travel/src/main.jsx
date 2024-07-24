import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import store from './store/store.js'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Community from './pages/Community.jsx'
import Chat from './pages/Chat.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import Profile from './pages/Profile.jsx'
import JournalForm from './pages/JournalForm.jsx'
import ViewJournal from './pages/ViewJournal.jsx'
import ExperienceShareForm from './pages/ExperienceShareForm.jsx'
import ViewResponse from './pages/ViewResponse.jsx'
import UpdateJournal from './pages/UpdateJournal.jsx'
import UpdateResponse from './pages/UpdateResponse.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/community",
            element: <Community/>,
        },
        {
            path: "/chat",
            element:<AuthLayout authentication>
            <Chat/>
        </AuthLayout>,
        },
        {
            path: "/signup",
            element: <AuthLayout authentication={false}>
            <SignupPage/>
        </AuthLayout>,
        },
        {
            path: "/login",
            element:<AuthLayout authentication={false}>
            <LoginPage/>
        </AuthLayout>,
        },
        {
            path: "/profile",
            element:<AuthLayout authentication>
            <Profile/>
        </AuthLayout>,
        },
        {
            path: "/journalform",
            element:<AuthLayout authentication>
            <JournalForm/>
        </AuthLayout>,
        },
        {
            path: "/journal/:id",
            element:<AuthLayout authentication>
                <ViewJournal/>
           </AuthLayout>,
        },
        {
            path: "experienceShareForm",
            element:<AuthLayout authentication>
                <ExperienceShareForm/>
           </AuthLayout>,
        },
        {
            path: "response/:id",
            element:<ViewResponse/>
          
        },
        {
            path: "updatejournal/:id",
            element:<UpdateJournal/>
          
        },
        {
            path: "updateresponse/:id",
            element:<UpdateResponse/>
          
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
);
