import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './routes/layout';
import { Basics } from './routes/basics/index';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/basics',
        element: <Basics />,
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
