import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Error from '../Components/Error/Error';
import Loading from '../Components/Loading/Loading';
import AnimeInfo from '../Components/Main/AnimeInfo';


function AnimePage() {
    let { id } = useParams();
    const [animeData, setAnimeData] = useState({name: "", poster: {}, alternativeNames: [], genres: [], studios: [], directors: []});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      const getData = async () => {
        try {
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
                  setLoading(false);
            }
        }
        catch(error) {
            console.log(error);
            setError(true);
        }
        };
        getData()
    }, []);


    return (
        <>
        {
            error ?
            <Error/>
            :
            loading ?
            <Loading />
            :
            <AnimeInfo data={animeData}/>
        }
        </>
    );
}   

export default AnimePage;
