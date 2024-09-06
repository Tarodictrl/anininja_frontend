import React, { useEffect, useState } from 'react';

import Header from '../Components/Header/Header';
import Authorization from '../Components/Authorization/Authorization';
import Footer from '../Components/Footer/Footer';
import { useSearchParams } from 'react-router-dom';

import AnimeList from '../Components/Main/AnimeList';
import Search from '../Components/Search/Search';
import AnimeChart from '../Components/Main/AnimeChart';

function AnimeChartPage() {
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
            <AnimeChart />
          </div>
          <footer className='App-footer'>
            <Footer />
          </footer>
        </div>
      );
}   

export default AnimeChartPage;
