import { Routes, Route} from 'react-router-dom';
import AccidentReport from './pages/AccidentReport';
import Home from './pages/Home';



const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<AccidentReport />} />
        </Routes>
    );
};

export default App;
