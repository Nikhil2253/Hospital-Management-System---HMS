import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';

import DoctorLogin from './components/login/DoctorLogin';
import PatientLogin from './components/login/PatientLogin';
import HospitalLogin from './components/login/HospitalLogin';

import DoctorRegister from './components/register/DoctorRegister';
import PatientRegister from './components/register/PatientRegister';
import HospitalRegister from './components/register/HospitalRegister';

import PatientDashboard from './components/dashboard/PatientDashboard';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import HospitalDashboard from './components/dashboard/HospitalDashboard';
import PatientProfile from './components/dashboard/patient/PatientProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Login/doctor',
    element: <DoctorLogin />,
  },
  {
    path: '/Login/patient',
    element: <PatientLogin />,
  },
  {
    path: '/Login/hospital',
    element: <HospitalLogin />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/Register/doctor',
    element: <DoctorRegister />,
  },
  {
    path: '/Register/patient',
    element: <PatientRegister />,
  },
  {
    path: '/Register/hospital',
    element: <HospitalRegister />,
  },
  {
    path: '/patient/:id',
    element: <PatientDashboard />,
  },
  {
    path: '/doctor/:id',
    element: <DoctorDashboard />,
  },
  {
    path: '/hospital/:id',
    element: <HospitalDashboard />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
