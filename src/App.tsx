import './App.css'
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
// import CameraVerticalPage from './CameraPage';
import FaceScannerUI from './FaceScannerUI';
import CamerVerticalPage from './CameraPage';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/camera" element={<CamerVerticalPage />} />
      </Routes>
    </BrowserRouter>
  );
};
