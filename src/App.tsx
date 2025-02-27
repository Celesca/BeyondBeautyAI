import './App.css'
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SelectPage from './SelectPage';
import ResultPage from './ResultPage';
import ClinicPage from './ClinicPage';
// import FakeCameraPage from './FakeCameraPage';
import CamerVerticalPage from './CameraPage';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/camera" element={<CamerVerticalPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/clinic" element={<ClinicPage />} />
      </Routes>
    </BrowserRouter>
  );
};
