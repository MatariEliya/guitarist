import React, { useContext, useEffect } from 'react';
import Header from './components/header'
import Footer from './components/footer'
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


import Home from './assets/pages/home/home';
import Creators from './assets/pages/creators/creators';
import CreatorPage from './assets/pages/creators/creatorPage/creatorPage';
import Chords from './assets/pages/chords/chords';
import Songs from './assets/pages/songs/songs';
import SongPage from './assets/pages/songs/songPage/songPage';
import Tuner from './assets/pages/tuner/tuner';
import LoginPage from './assets/pages/loginPage/loginPage';
import ProfilePage from './assets/pages/profilePage/profilePage';
import CreateChord from './assets/pages/createChord/createChord';
import CreateSong from './assets/pages/createSong/createSong';
import CreateCreatorProfile from './assets/pages/createCreatorProfile/createCreatorProfile';
import SeeAllPage from './assets/pages/seeAllPage/seeAllPage';


import MainMenu from './components/Menu/MainMenu/mainMenu';
import Background from './assets/backeground/background';
import ProfileMenu from './components/Menu/profileMenu/profileMenu';
import Popup from './components/Popup/popup';
import { ProfileSvg } from './assets/svg/svg';

import { GlobalProvider, GlobalContext} from './globalsIndex';






function AppShell() {
  const {userType} = useContext(GlobalContext);

  const location = useLocation();

  
  const mainMenuPages = [
    { value: '/', label: 'Home', menu: true },
    { value: '/creators', label: 'Creators', menu: true },
    { value: '/songs', label: 'Songs', menu: true },
    { value: '/chords', label: 'Chords', menu: true },
    { value: '/tuner', label: 'Tuner', menu: true },
  ];
  const allPages = [
    ...mainMenuPages,
    { value: '/createChord', menu: false },
  ];
  let isEmptyPage = !allPages.some(page => (page.value === location.pathname) && page.menu);
  if(location.pathname.startsWith('/songs/') || location.pathname.startsWith('/creators/')){
    isEmptyPage = false;
  }
  return (
    <>
      <Background />
      <div className="container">
        {!isEmptyPage && <MainMenu className="mainMenu" options={mainMenuPages}/>}
        <div className='pageContent'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/creators/:profileID" element={<CreatorPage />} />
            <Route path="/chords" element={<Chords />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/songs/:songID" element={<SongPage />} />
            <Route path="/tuner" element={<Tuner />} />
            <Route path="/loginSignup" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/createChord" element={<CreateChord />} />
            <Route path="/createSong" element={<CreateSong/>} />
            <Route path="/createCreatorProfile" element={<CreateCreatorProfile/>} />
            <Route path="/seeAll/:type" element={<SeeAllPage/>} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}


function App() {
  return(
    <GlobalProvider>
      <Popup/>
      <Router>
        <ScrollToTop/>
        <AppShell/>
      </Router>
    </GlobalProvider>
  )
}

export default App
