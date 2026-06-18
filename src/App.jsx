import React, { useContext, useEffect, useState } from 'react';
import Header from './components/header'
import Footer from './components/footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


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
import Popup from './components/Popup/popup';
import { ProfileSvg } from './assets/svg/svg';

import { GlobalProvider, GlobalContext} from './globalsIndex';






function AppShell() {
  const {setUsername, setUserType} = useContext(GlobalContext);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if(decoded.exp > currentTime){
          setUsername(decoded.username);
          setUserType(decoded.creator ? "creator" : "member");
        }else{
          setUserType("guest")
          setUsername("")
          sessionStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);


  const location = useLocation();

  
  const mainMenuPages = [
    { value: '/', label: 'Home'},
    { value: '/creators', label: 'Creators'},
    { value: '/songs', label: 'Songs'},
    { value: '/chords', label: 'Chords'},
    { value: '/tuner', label: 'Tuner'},
  ];
  const allPagesWithMenu = [
    ...mainMenuPages,
    { value: '/profile'},
  ];


  const [isEmptyPage, setIsEmptyPage] = useState(true);
  useEffect(() => {
    const songPage = location.pathname.startsWith('/songs/');
    const creatorPage = location.pathname.startsWith('/creators/');
    const empty = ((!allPagesWithMenu.some(page => (page.value === location.pathname))) && !songPage && !creatorPage);
    if(!songPage){
      document.title = "Guitarist";
    }
    setIsEmptyPage(empty);
  }, [location.pathname]);
  return (
    <>
      <Background />
      <div className="container">
        {!isEmptyPage && <MainMenu className="mainMenu" options={mainMenuPages}/>}
        <div className='pageContent'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/creators/:creatorID" element={<CreatorPage />} />
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
