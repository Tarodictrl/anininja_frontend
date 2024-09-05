import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import ReactPaginate from 'react-paginate'

import AnimeList from './AnimeList';

const Main = () => {

    const [animeData, setAnimeData] = useState({'responses': []});

    useEffect(() => {
      const func = async () => {
          const response = await fetch(
              'https://api.anininja.ru/api/anime/?limit=24&offset=0&year=2024&season=3&order_by=relevance&direction=asc',
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
        const newOffset = (event.selected * animeData.limit) % animeData.total;
        const response = await fetch(
              `https://api.anininja.ru/api/anime/?limit=24&offset=${newOffset}&year=2024&season=3&order_by=relevance&direction=asc`,
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
            <h1 className='text-white'>Аниме летнего сезона</h1>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={animeData.total / animeData.limit}
                pageCount={animeData.total / animeData.limit}
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

export default Main;