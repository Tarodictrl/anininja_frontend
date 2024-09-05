import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-bootstrap';

const AnimeItem = ({ data }) => {
    return (
        <div className='position-relative col anime_card m-2'>
            <a href={data.url}>
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