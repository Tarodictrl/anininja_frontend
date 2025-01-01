import React from 'react';

import AnimeItemMiniCard from './AnimeItemMiniCard';
import Filter from './Filter';
import './Catalog.css';

const Catalog = ({ data }) => {
    return (
        <div className="anime-catalog">
            <div className="anime-catalog-list">
                <div className='anime-catalog-items'>
                    { data.responses.length > 0 ? 
                    data.responses.map((item) => {
                        return (
                            <AnimeItemMiniCard item={item}/>
                        );
                    }) : 
                    <div className="anime-catalog-empty">
                        Ничего не найдено :(
                    </div>
                    }
                </div>
            </div>
            <div className="anime-catalog-filter">
                <Filter />
            </div>
        </div>
      );
};


export default Catalog;