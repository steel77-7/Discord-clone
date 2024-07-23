import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Login from "./components/authentication/login.jsx";
import SignIn from "./components/authentication/signup.jsx";
import { Dashboard } from "./components/MainArea/dashboard.jsx";
import { ChatArea } from "./components/MainArea/chat/chatarea.jsx";
import { Mainarea } from "./components/MainArea/mainarea.jsx";
import { VidCallLayout } from "./components/webRtc/rtcCalling.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/> , 
    children:[
      {
        path:'app',
        element:< Mainarea/>,
        children:[
          {
            path:'@me',
            element:<Dashboard/>,
            children: [
              /* {
                path: ":chatid",
                element: <ChatArea/>, // Profile component for different profiles
              }, */
            ],
          },
          {
            path:'@me/:chatid',
            element:<ChatArea/>,
          },
          {
            path:'@me/vidcall',
            element:<VidCallLayout/>,
            
          }
        ]
      }
    ]
  },
  {
    path:'login',
    element: <Login/>
  },
  {
    path:'signup',
    element: <SignIn/>
  }

]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router} />
    </Provider>
  </React.StrictMode>
);
