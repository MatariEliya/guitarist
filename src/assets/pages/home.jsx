import React from 'react';
import Header from '../../components/header';
import LessonMenu from '../../components/lessonMenu/lessonMenu';

const Home = () => {
  console.log("Rendering LoginPage");
  return (
    <>
        <Header />
        <p>Welcome to the guitarist app!</p>
        <LessonMenu />
    </>
  );
};
export default Home;