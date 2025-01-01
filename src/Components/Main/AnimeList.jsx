import React from 'react';
import Carousel from 'react-grid-carousel'

import './AnimeList.css'
import AnimeItemMiniCard from './AnimeItemMiniCard';


const AnimeList = ({ data }) => {

    return (
        <Carousel cols={10} rows={1} gap={0} showDots={false} scrollSnap loop>
          {data.responses.map((item) => {
                return (
                    <Carousel.Item key={item.id}>
                        <AnimeItemMiniCard item={item}/>
                    </Carousel.Item>
                );
            })}
        </Carousel>
    )
};

export default AnimeList;