import React, { useEffect, useState} from 'react';

import Error from '../Components/Error/Error';
import Loading from '../Components/Loading/Loading';
import AnimeList from '../Components/Main/AnimeList';

import './MainPage.css';

const MainPage = () => {

    const [animeNewData, setAnimeNewData] = useState({'responses': []});
    const [animeAnnouncData, setAnimeAnnouncData] = useState({'responses': []});
    const [animeTopData, setAnimeTopData] = useState({'responses': []});
    const [filmsTopData, setFilmsTopData] = useState({'responses': []});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        document.title = "Главная";
        Promise.all([
            fetch('https://api.anininja.ru/api/anime/?status=онгоинг'),
            fetch('https://api.anininja.ru/api/anime/?status=анонс'),
            fetch('https://api.anininja.ru/api/anime/?'),
            fetch('https://api.anininja.ru/api/anime/?&type=Полнометражный фильм'),
        ])
            .then(([resultAnimeNewData, resultAnimeAnnouncData, resultAnimeTopData, resultFilmsTopData]) =>
                Promise.all([resultAnimeNewData.json(), resultAnimeAnnouncData.json(), resultAnimeTopData.json(), resultFilmsTopData.json()])
            )
            .then(([resultAnimeNewData, resultAnimeAnnouncData, resultAnimeTopData, resultFilmsTopData]) => {
                setAnimeNewData(resultAnimeNewData);
                setAnimeAnnouncData(resultAnimeAnnouncData);
                setAnimeTopData(resultAnimeTopData);
                setFilmsTopData(resultFilmsTopData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message)
                setTimeout(() => {setLoading(false)}, 100000);
                setError(true);
            });
    }, []);

    return (
        <>
        {
            error ?
            <Error />
            :
            loading ?
            <Loading />
            :            
            <div className="main">
                <div className="anime-card">
                    <div className="title">
                        Новинки
                    </div>
                    <AnimeList data={animeNewData}/>
                </div>
                <div className="anime-card">
                    <div className="title">
                        Анонсы
                    </div>
                    <AnimeList data={animeAnnouncData}/>
                </div>
                <div className="anime-card">
                    <div className="title">
                        Топ аниме
                    </div>
                    <AnimeList data={animeTopData}/>
                </div>
                <div className="anime-card">
                    <div className="title">
                        Топ фильмов
                    </div>
                    <AnimeList data={filmsTopData}/>
                </div>
            </div>
        }
        </>
      );
};

export default MainPage;