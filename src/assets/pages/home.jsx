import React from 'react';
import Header from '../../components/header';
import LessonMenu from '../../components/lessonMenu/lessonMenu';
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <>
        <Header />
        <p>Welcome to the guitarist app!</p>
        <button onClick={() => alert('Button clicked!')}>
            <h1>Subscribe</h1>
        </button>
        <Button variant="outlined" style={{ color: 'black' }}>Hello world</Button>
        <LessonMenu />
    </>
  );
};
export default Home;