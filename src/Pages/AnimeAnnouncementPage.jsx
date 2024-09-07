import React from 'react';

import Header from '../Components/Header/Header';
import Authorization from '../Components/Authorization/Authorization';
import Footer from '../Components/Footer/Footer';
import Search from '../Components/Search/Search';
import AnimeAnnouncement from '../Components/Main/AnimeAnnouncement';

function AnimeAnnouncementPage() {
    return (
        <div className="App">
          <div className="App-top">
            <Authorization />
          </div>
          <header className="App-header">
            <Header />
          </header>
          <div className='bg-dark pt-5'>
            <Search />
            <AnimeAnnouncement />
          </div>
          <footer className='App-footer'>
            <Footer />
          </footer>
        </div>
      );
}   

export default AnimeAnnouncementPage;