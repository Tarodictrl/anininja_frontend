import React, { useEffect, useState } from 'react';

import Header from '../Header/Header';
import Authorization from '../Authorization/Authorization';
import Footer from '../Footer/Footer';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './AnimePage.css'
import Search from '../Search/Search'

function AnimePage() {
    let { id } = useParams();
    const [animeData, setAnimeData] = useState({name: "", poster: {}, alternativeNames: [], genres: [], studio: {}, directors: []});

    useEffect(() => {
      const func = async () => {
          const response = await fetch(
              `https://api.anininja.ru/api/anime?url=/anime/${id}&limit=1`,
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
                setAnimeData(value.responses[0]);
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
                <Container className='text-white mt-4'>
                    <div className='d-flex text-white d-inline-flex  p-3 mb-3 bg-gray rounded-4 border border-1'>
                        <div className='position-relative float-right pe-5'>
                            <Image src={`https://${animeData.poster.big}`}></Image>
                        </div>
                        <div className='position-relative'>
                            <h3>{animeData.name}</h3>
                            <div>
                                {animeData.alternativeNames.map(item => <li>{item}</li>)}
                            </div>
                            <div className='position-relative text-start'>
                                Статус: {animeData.status}
                            </div>
                            <div className='position-relative text-start'>
                                Тип: {animeData.type}
                            </div>
                            <div className='position-relative text-start'>
                                Год выхода: {animeData.year}
                            </div>
                            <div className='position-relative text-start'>
                                Возрастной рейтинг: {animeData.age}
                            </div>
                            <div className='position-relative text-start d-flex'>
                                Жанры: <div className='position-relative d-flex'>{animeData.genres.map(item => <div className='mini-block'> {item.name}</div>)}</div>
                            </div>
                            <div className='position-relative text-start d-flex'>
                                Студия: {animeData.studio && animeData.studio.name}
                            </div>
                            <div className='position-relative text-start d-flex'>
                                Режиссер: <div className='position-relative d-flex'>{animeData.directors.map(item => <div className='mini-block'> {item.name}</div>)}</div>
                            </div>
                            <div className='position-relative text-start d-flex'>
                                Количество серий: {animeData.countSeries}
                            </div>
                            <div className='mt-3'>{animeData.description}</div>
                        </div>
                    </div>
                    <div className='video'>
                        <iframe title='video' src={animeData.kodik_link} width="100%" height="500" frameborder="0" AllowFullScreen allow="autoplay *; fullscreen *"></iframe>
                    </div>
                </Container>
            </div>
            <footer className='App-footer'>
                <Footer/>
            </footer>
        </div>
    );
}   

export default AnimePage;
