import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-bootstrap';

const AnimeItem = ({ data }) => {
    return (
        <div className='position-relative col anime_card m-2'>
            <a href={data.url}>
                <span className='rating position-absolute bg-warning mt-3 align-text-middle text-white fw-bold fs-5 justify-content-center'>
                    <span className='p-2'>
                        {data.rating.avg_rating.toString().substring(0, 4)}
                    </span>
                </span>
                <Image src={`https://${data.poster.big}`}>
                </Image>
            </a>
            <div>{data.name}</div>
        </div>
      );
};

AnimeItem.propTypes = {
    data: PropTypes.objectOf().isRequired,
};


export default AnimeItem;