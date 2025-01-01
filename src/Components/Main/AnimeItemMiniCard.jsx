import React, {useState} from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './AnimeItemMiniCard.css';
import { Image } from 'react-bootstrap';

const AnimeItemMiniCard = ({ item }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleMouseEnter = (item) => {
        const timeout = setTimeout(() => {
            setHoveredItem(item);
            setShowInfo(true);
        }, 400);
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setShowInfo(false);
        setHoveredItem(null);
    };

    return (
        <div 
            className="anime-item-card"
        >
            <a href={item.url}>
                <div 
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div style={{ position: "relative", width: "150px", height: "225px" }}>
                        {isLoading && (
                            <Skeleton
                            height="100%"
                            width="100%"
                            className='anime-item-card-img-skeleton'
                            />
                        )}
                        <Image
                            className="anime-item-card-img"
                            src={`https://${item.poster.big}`}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", display: isLoading ? "none" : "block" }}
                            onLoad={() => setIsLoading(false)}
                            onError={() => setIsLoading(false)}
                        />
                    </div>
                        {
                        item.rating.avg_rating !== 0 ?
                            <div className="rating-badge" >
                                {item.rating.avg_rating.toFixed(2)}
                            </div>
                        :
                        null
                        }
                </div>
            </a>
            {showInfo && hoveredItem === item && (
                <div className="anime-item-info d-flex">
                    <div className='w-100'>
                        <h3 className='anime-item-info-title'>{item.name}</h3>
                        <p>{item.year !== 0 ? item.year : "Неизвестно" } | {item.type} | {item.status}</p>
                        <p className='mb-1'>
                            <div className='position-relative d-flex flex-wrap'>
                            <p className='m-0'>Жанры:</p> {item.genres.length !== 0 ? item.genres.slice(0, 5).map(genre => <div className='ms-1'> {genre.name}</div>): "Неизвестно"}</div>
                        </p>
                        <p className='text-start mb-1'>Количество серий: {item.countSeries}</p>
                        <div className='position-relative d-flex flex-wrap category-value mb-1'>Режиссер: {item.directors.length !== 0 ? item.directors.map(item => <div className='ms-1'> {item.name}</div>) : "Неизвестно"}</div>
                        <div className='position-relative d-flex flex-wrap category-value mb-1'>Студия: {item.studios.length !== 0 ? item.studios.map(item => <div className='ms-1'> {item.name}</div>): "Неизвестно"}</div>
                    </div>
                    <div>
                        <Image className="anime-item-card-img" width="150px" src={`https://${item.poster.big}`} />
                    </div>
                </div>
            )}
        </div>
    )
};


export default AnimeItemMiniCard;