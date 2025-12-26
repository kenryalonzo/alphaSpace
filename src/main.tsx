import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Apod, HomeLayout, Hubble, Landing, News, Spacex, Webb } from './pages';

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <HomeLayout />, 
    children: [
      { index: true, element: <Landing /> }, 
      { path: "news", element: <News /> },
      { path: "webb", element: <Webb /> },
      { path: "spacex", element: <Spacex /> },
      { path: "apod", element: <Apod /> },
      { path: "hubble", element: <Hubble /> },
    ], 
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
