import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Connect from './pages/connect/Connect';
import MyMind from './pages/myMind/MyMind';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/connect" element={<Connect/>} />
        <Route path="/myMind" element={<MyMind />} />
      </Routes>
    </>
  );
}

export default App;
