
import './App.css';
import Footer from './components/Footer';
import ParentNav from './components/ParentNav';
import Playing from './components/Playing';
import Login from './components/Login';
import SongList from './components/SongList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Search from './components/Search';
import { activeTrack } from './components/TrackState';
import {useRecoilState } from "recoil";

import NoPage from './components/NoPage'





function App() {
  const [trackPath] = useRecoilState(activeTrack);
  return (
    <>
    <div className="App">
     <BrowserRouter>
          <Routes>
          <Route exact path="/login/" element={<Login/>}/>
            <Route path="/" element={<ParentNav />}>
              <Route index element={<Home />} />
              <Route exact path="/song-list/" element={<SongList />} />
              <Route path={`/${trackPath.title}`} element={<Playing />} />
              <Route path={`/song-list/${trackPath.title}`} element={<Playing />} />
              <Route path='/track' element={<Search/>}/>
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
    <div style={{marginTop:"3em"}}>
    <Footer/>
    </div>
    
    </>
    

  );
}

export default App;
