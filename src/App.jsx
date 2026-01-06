import Header from './components/header'
import Footer from './components/footer'
import LessonMenu from './components/lessonMenu/lessonMenu';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './assets/pages/home';
import About from './assets/pages/about';
import Chords from './assets/pages/chords/chords';
import Tuner from './assets/pages/tuner/tuner';
import LoginPage from './assets/pages/loginPage/loginPage';
import CreateChord from './assets/pages/createChord/createChord';

import MainMenu from './components/Menu/MainMenu/mainMenu';
import Background from './assets/backeground/background';
import ProfileMenu from './components/Menu/profileMenu/profileMenu';

import { GlobalProvider } from './globalsIndex';





function AppShell() {
  const location = useLocation(); // בודק איפה אנחנו נמצאים

  
  const mainMenuPages = [
    {value: '/loginSignup', label: svgIcon(), menu: false},
    { value: '/', label: 'Home', menu: true },
    { value: '/about', label: 'About', menu: true },
    { value: '/chords', label: 'Chords', menu: true },
    { value: '/tuner', label: 'Tuner', menu: true },
  ];
  const allPages = [
    ...mainMenuPages,
    { value: '/createChord', menu: false },
  ];
  const isEmptyPage = !allPages.some(page => (page.value === location.pathname) && page.menu);
  console.log("isEmptyPage:", isEmptyPage);

  return (
    <>
      <Background />
      {/*!isEmptyPage && <ProfileMenu />*/}
      <div className="container">
        {!isEmptyPage && <MainMenu className="mainMenu" options={mainMenuPages}/>}
        <div className='pageContent'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chords" element={<Chords />} />
            <Route path="/tuner" element={<Tuner />} />
            <Route path="/loginSignup" element={<LoginPage />} />
            <Route path="/createChord" element={<CreateChord />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </>
  );
}

function svgIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 22" width="2.25vw" height="3vw" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <clipPath id="clip0_104_2">
        <rect width="30" height="20" fill="white"/>
      </clipPath>
      <circle cx="10" cy="6" r="5" stroke="black" strokeWidth="1" />
      <circle cx="10" cy="19" r="8" stroke="black" strokeWidth="1" clipPath="url(#clip0_104_2)" />
    </svg>
  );
}

function App() {
  return(
    <GlobalProvider>
      <Router>
        <AppShell/>
      </Router>
    </GlobalProvider>
  )
}

export default App
