import React, { useEffect, useState } from 'react';

import Header from '../Components/Header/Header';
import Authorization from '../Components/Authorization/Authorization';
import Footer from '../Components/Footer/Footer';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './AnimePage.css'
import Search from '../Components/Search/Search'

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
                            <div className='position-relative text-start row'>
                                <div className="col-sm-3">
                                    <span>Статус:</span>
                                </div>
                                <div className="col">
                                    {animeData.status}
                                </div>
                            </div>
                            <div className='position-relative text-start row'>
                                <div className="col-sm-3">
                                    <span>Тип:</span>
                                </div>
                                <div className="col">
                                    {animeData.type}
                                </div>
                            </div>
                            <div className='position-relative text-start row'>
                                <div className="col-sm-3">
                                    <span>Год выхода:</span>
                                </div>
                                <div className="col">
                                    {animeData.year}
                                </div>
                            </div>
                            <div className='position-relative text-start row'>
                            <div className="col-sm-3">
                                    <span>Возрастной рейтинг:</span>
                                </div>
                                <div className="col">
                                    {animeData.age}
                                </div>
                            </div>
                            <div className='position-relative text-start d-flex row'>
                            <div className="col-sm-3">
                                    <span>Жанры:</span>
                                </div>
                                <div className="col">
                                    <div className='position-relative d-flex flex-wrap gap-1'>{animeData.genres.map(item => <div className='mini-block'> {item.name}</div>)}</div>
                                </div>
                            </div>
                            <div className='position-relative text-start d-flex row'>
                                <div className="col-sm-3">
                                    <span>Студия:</span>
                                </div>
                                <div className="col">
                                    {animeData.studio && animeData.studio.name}
                                </div>
                            </div>
                            <div className='position-relative text-start d-flex row'>
                                <div className="col-sm-3">
                                    <span>Режиссер:</span>
                                </div>
                                <div className="col">
                                    <div className='position-relative d-flex'>{animeData.directors.map(item => <div className='mini-block'> {item.name}</div>)}</div>
                                </div>
                            </div>
                            <div className='position-relative text-start d-flex row'>
                                <div className="col-sm-3">
                                    <span>Количество серий:</span>
                                </div>
                                <div className="col">
                                    {animeData.countSeries}
                                </div>
                            </div>
                            <div className='mt-3 text-start'>{animeData.description}</div>
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
