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

const router = createBrowserRouter([
  {
    path: "/app",
    element:<App/> , 
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/',
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
