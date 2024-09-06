import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import ReactPaginate from 'react-paginate'

import AnimeList from './AnimeList';

const AnimeChart = () => {

    const [animeData, setAnimeData] = useState({'responses': []});

    useEffect(() => {
      const func = async () => {
          const response = await fetch(
              'https://api.anininja.ru/api/anime/?order_by=relevance&direction=asc',
              {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
              }
          );

          if (response.ok) {
              setAnimeData(await response.json());
          }
        };
        func()
    }, []);

    const handlePageClick = async (event) => {
        const newOffset = (event.selected * 24);
        const response = await fetch(
              `https://api.anininja.ru/api/anime/?limit=24&offset=${newOffset}&order_by=relevance&direction=asc`,
              {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
              }
          );

          if (response.ok) {
              setAnimeData(await response.json());
        }
    };

    return (
          <Container>
            <h1 className='text-white'>Лучшие аниме</h1>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={5}
                previousLabel="<"
                renderOnZeroPageCount={null}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
            <AnimeList data={animeData}></AnimeList>
          </Container>
      );
};

export default AnimeChart;