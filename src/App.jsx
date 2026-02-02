import { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import AccidentReport from './pages/AccidentReport';
import Home from './pages/Home';
import FaceCapture from './components/FaceCapture';

const App = () => {
    const [capturedFace, setCapturedFace] = useState(null);

    if (!capturedFace) {
        return <FaceCapture onCapture={setCapturedFace} />;
    }

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<AccidentReport capturedFace={capturedFace} />} />
        </Routes>
    );
};

export default App;
