import React, { useEffect, useState } from 'react';

import Catalog from '../Components/Main/Catalog';
import Error from '../Components/Error/Error';
import Loading from '../Components/Loading/Loading';
import { useSearchParams } from "react-router-dom";

function AnimeCatalogPage() {
    var link;
    const [animeData, setAnimeData] = useState({responses: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchParams, ] = useSearchParams();
    if (searchParams.size > 0 && searchParams !== undefined) {
        link = `https://api.anininja.ru/api/anime/?`;
        for (const [key, value] of searchParams) {
            link += `${key}=${value}&`;
        }
    }
    else {
        link = `https://api.anininja.ru/api/anime/?status=вышел&order_by=relevance&direction=asc&type=Сериал`;
    }

    useEffect(() => {
      const getData = async () => {
        try {
            const response = await fetch(
                link,
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
                  setAnimeData(value);
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
            <Error />
            :
            loading ?
            <Loading />
            :
            (
                <>
                    <Catalog data={animeData}/>
                </>
            )
        }
        </>
    );
}   

export default AnimeCatalogPage;
