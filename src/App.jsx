import Header from './components/header'
import Footer from './components/footer'
import LessonMenu from './components/lessonMenu/lessonMenu';
import * as React from 'react';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './assets/pages/home';
import About from './assets/pages/about';
import Chords from './assets/pages/chords/chords';
import Tuner from './assets/pages/tuner/tuner';
import LoginPage from './assets/pages/loginPage/loginPage';

import MainMenu from './components/Menu/MainMenu/mainMenu';
import Background from './assets/backeground/background';
import ProfileMenu from './components/Menu/profileMenu/profileMenu';


function AppShell() {
  const location = useLocation(); // בודק איפה אנחנו נמצאים
  
  const emptyPages = [
    "/loginSignup",
  ]

  const isEmptyPage = emptyPages.includes(location.pathname);

  const mainMenuPages = [
    { value: '/', label: 'Home' },
    { value: '/about', label: 'About' },
    { value: '/chords', label: 'Chords' },
    { value: '/tuner', label: 'Tuner' },
  ];


  return (
    <>
      <Background />
      {!isEmptyPage && <ProfileMenu />}
      <div className="container" style={{marginLeft: isEmptyPage? 0 : "5vw"}}>
        {!isEmptyPage && <MainMenu className="mainMenu" options={mainMenuPages}/>}
        <div className='pageContent'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chords" element={<Chords />} />
            <Route path="/tuner" element={<Tuner />} />
            <Route path="/loginSignup" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </>
  );
}
function App() {
  return(
    <Router>
      <AppShell/>
    </Router>
  )
}

export default App
