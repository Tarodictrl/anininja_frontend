import React from 'react';

import { Image } from 'react-bootstrap';

import './AnimeItem.css';

const AnimeItem = ({ data }) => {
    return (
        <div className='position-relative col anime_card'>
            <a href={data.url}>
                <Image src={`https://${data.poster.big}`} />
            </a>
        </div>
      );
};


export default AnimeItem;