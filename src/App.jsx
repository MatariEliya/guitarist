import Header from './components/header'
import Footer from './components/footer'
import LessonMenu from './components/lessonMenu/lessonMenu';
import * as React from 'react';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './assets/pages/home';
import About from './assets/pages/about';
import Chords from './assets/pages/chords/chords';
import Tuner from './assets/pages/tuner/tuner';
import MainMenu from './components/MainMenu/mainManu';

function App() {
  const pages = [
    { value: '/', label: 'Home' },
    { value: '/about', label: 'About' },
    { value: '/chords', label: 'Chords' },
    { value: '/tuner', label: 'Tuner' },
  ];
  console.log(pages);
  return (
    <Router>
      <div className="container">
        <MainMenu className="mainMenu" options={pages}/>
        <div className='pageContent'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chords" element={<Chords />} />
            <Route path="/tuner" element={<Tuner />} />
          </Routes>
        </div>
        

        <Footer/>
      </div>
    </Router>
  );
}


export default App
