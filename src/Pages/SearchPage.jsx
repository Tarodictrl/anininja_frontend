import React, { useEffect, useState } from 'react';

import Header from '../Components/Header/Header';
import Authorization from '../Components/Authorization/Authorization';
import Footer from '../Components/Footer/Footer';
import { useSearchParams } from 'react-router-dom';

import AnimeList from '../Components/Main/AnimeList';
import Search from '../Components/Search/Search';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const [animeData, setAnimeData] = useState({responses: []});

    useEffect(() => {
      const func = async () => {
          const response = await fetch(
              `https://api.anininja.ru/api/anime?name=${searchParams.get("name")}`,
              {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
              }
          );

          if (response.ok) {
                let value = await response.json()
                console.log(value);
                setAnimeData(value);
          }
        };
        func()
    });
    return (
        <div className="App">
            <div className="App-top">
                <Authorization />
            </div>
            <header className="App-header">
                <Header />
            </header>
            <div className='bg-dark p-4'>
                <Search />
                <AnimeList data={animeData}/>
            </div>
            <Footer />
        </div>
    );
}   

export default SearchPage;
