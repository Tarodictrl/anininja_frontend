import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import AnimeItem from './AnimeItem'


const AnimeList = ({ data }) => {
    return (
          <Container className='pb-3'>
            {data.responses.length !== 0 && (
                <div className='row text-white'>
                    {data.responses.map((item) => {
                        return (
                            <AnimeItem
                                key={item.id}
                                data={item}
                            />
                        );
                    })}
                </div>
            )}
          </Container>
      );
};

AnimeList.propTypes = {
    data: PropTypes.arrayOf().isRequired,
};

export default AnimeList;