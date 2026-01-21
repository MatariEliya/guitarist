import Header from './components/header'
import Footer from './components/footer'
import LessonMenu from './components/lessonMenu/lessonMenu';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './assets/pages/home';
import About from './assets/pages/about';
import Chords from './assets/pages/chords/chords';
import Songs from './assets/pages/songs/songs';
import Tuner from './assets/pages/tuner/tuner';
import LoginPage from './assets/pages/loginPage/loginPage';
import CreateChord from './assets/pages/createChord/createChord';
import CreateSong from './assets/pages/createSong/createSong';

import MainMenu from './components/Menu/MainMenu/mainMenu';
import Background from './assets/backeground/background';
import ProfileMenu from './components/Menu/profileMenu/profileMenu';
import Popup from './components/Popup/popup';
import { profileSvg } from './assets/svg';

import { GlobalProvider } from './globalsIndex';






function AppShell() {
  const location = useLocation();

  
  const mainMenuPages = [
    {value: '/loginSignup', label: profileSvg(), menu: false},
    { value: '/', label: 'Home', menu: true },
    { value: '/about', label: 'About', menu: true },
    { value: '/chords', label: 'Chords', menu: true },
    { value: '/songs', label: 'Songs', menu: true },
    { value: '/tuner', label: 'Tuner', menu: true },
  ];
  const allPages = [
    ...mainMenuPages,
    { value: '/createChord', menu: false },
  ];
  let isEmptyPage = !allPages.some(page => (page.value === location.pathname) && page.menu);
  if(location.pathname.startsWith('/songs/')){
    console.log("song");
     isEmptyPage = false;
  }
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
            <Route path="/songs" element={<Songs />} />
            <Route path="/songs/:songID" element={<Songs />} />
            <Route path="/tuner" element={<Tuner />} />
            <Route path="/loginSignup" element={<LoginPage />} />
            <Route path="/createChord" element={<CreateChord />} />
            <Route path="/createSong" element={<CreateSong/>} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </>
  );
}


function App() {
  return(
    <GlobalProvider>
      <Popup/>
      <Router>
        <AppShell/>
      </Router>
    </GlobalProvider>
  )
}

export default App
