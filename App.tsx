import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FootballPage from './pages/FootballPage';
import ThreeDPrintingPage from './pages/ThreeDPrintingPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/football" element={<FootballPage />} />
            <Route path="/3d-printing" element={<ThreeDPrintingPage />} />
        </Routes>
    );
}

export default App;