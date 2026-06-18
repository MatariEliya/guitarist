
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header';
import { ProfileCard } from '../creators/creators';
import { SongCard } from '../songs/songs';

function Home() {
  const navigate = useNavigate();


  const [creators, setCreators] = useState([
    /*{creatorName: "Eliya matari", image: "https://i1.sndcdn.com/artworks-yozHWjWpjaFSXbvH-JVqSbg-t500x500.jpg", tags: ["chill", "pop", "Responds to requests"], profileID: "hdtjhfjgl"},
    {creatorName: "Taylor Guitars", image: "https://www.taylorguitars.com/sites/default/files/images/2025-04/Academy_1024x1181.jpg", tags: ["rock", "live performances"], profileID: "jd12345"},
    {creatorName: "Jane Smith", image: "https://example.com/janesmith.jpg", tags: ["jazz", "improvisation"], profileID: "js67890"}*/
  ]);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const Cresponse = await fetch("http://localhost:3001/creators/featured", {
        method: "GET",
      });
      const Sresponse = await fetch("http://localhost:3001/songs/popular", {
        method: "GET",
      });
      if(Cresponse.ok){
        const Cdata = await Cresponse.json();
        setCreators(Cdata);
      }
      if(Sresponse.ok){
        const Sdata = await Sresponse.json();
        setSongs(Sdata);
      }
    }
    fetchData();
  }, []);
  return (
    <div className='columnLayout'>
        <Header />
        <span style={{fontSize: '2vw', fontWeight: 'bold'}}>Welcome to guitarist!</span>
        <span style={{fontSize: '1vw'}}>Your ultimate destination for mastering guitar skills, exploring chords, and discovering new songs.</span>
        <div className='columnLayout' style={{backgroundColor: "rgba(255, 255, 255, 0.5)", margin: "1vw", padding: "1vw", borderRadius: "2vw", width: "90%"}}>
          <span style={{fontSize: '2vw', fontWeight: 'bold', marginBottom: "1vw", color: "rgb(58, 58, 58)"}}>Our Featured Creators</span>
          <div className='rowContent'>
            {creators.map(
              (creator, index) =>
                index < 5 && (
                  <ProfileCard key={index} info={creator} onClick={() => navigate(`/creators/${creator.profileID}`)}/>
                )
            )}
          </div>
        </div>
        <div className='columnLayout' style={{backgroundColor: "rgba(255, 255, 255, 0.5)", margin: "1vw", padding: "1vw", borderRadius: "2vw", width: "90%"}}>
          <span style={{fontSize: '2vw', fontWeight: 'bold', marginBottom: "1vw", color: "rgb(58, 58, 58)"}}>Popular Songs</span>
          <div className='rowContent'>
            {songs.map(
              (song, index) =>
                index < 5 && (
                  <SongCard key={song.songID} image={`http://localhost:3001/images/${song.songID}_song.webp`} songName={song.songName} artist={song.artist} onClick={() => navigate(`/songs/${song.songID}`)}/>
                )
            )}
          </div>
        </div>
        <div style={{width: "80%", backgroundColor: "rgb(255, 255, 255)", margin: "2vw", borderRadius: "2vw"}}>
          <span style={{color: "rgb(58, 58, 58)", fontSize: '2vw', fontWeight: 'bold', marginTop: "2vw"}}>About guitarist</span>
          <p style={{color: "rgb(58, 58, 58)", fontSize: '1vw', width: "100%", textAlign: "center", padding: "1vw"}}>
            This website was created as a final project for a high school Computer Science program and is dedicated to learning and exploring guitar playing.
            <br/>
            The platform allows creators to upload original content such as songs and chords. Users can browse this content, learn at their own pace, and interact with creators by sending song requests.
            <br/>
            In addition to learning materials, the website includes useful tools for guitar players, such as a built-in guitar tuner, designed to make practicing easier and more accessible.
            <br/>
            The goal of the project is to combine technology and music into one interactive learning environment, giving guitar players a place to learn, practice, and connect with creators in a simple and intuitive way.
          </p>
        </div>

    </div>
  );
};
export default Home;