import { Routes, Route } from 'react-router-dom';
import CameraVerticalPage from './CameraPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CameraVerticalPage />} />
      <Route path="/camera" element={<CameraVerticalPage />} />
    </Routes>
  );
}

export default App;