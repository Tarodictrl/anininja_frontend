import React, { useState, useEffect } from 'react';

import { Image } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

import './AnimeInfo.css';

const AnimeInfo = ({ data }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const getComments = async () => {
        try {
            const response = await fetch(
                `https://api.anininja.ru/api/anime/${data.id}/comments?order_by=comment_date&direction=asc`,
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
                    setComments(value.responses);
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getComments()
    }, []);

    const sendComment = async () => {
        try {
            console.log(comment);
            const response = await fetch(
                `https://api.anininja.ru/api/anime/comment`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        message: comment,
                        anime_id: data.id,
                    }),
                }
            );
    
            if (response.ok) {
                getComments();
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpand = () => setIsExpanded(!isExpanded);
    
    document.title = data.name;

    return (
        <div className="anime">
            <Row className="info p-5">
                    <h2 className='anime-title'>{data.name}</h2>
                    <Col md={"auto"} className='poster'>
                        <Image src={`https://${data.poster.big}`}/>
                    </Col>
                    <Col md={"5"}>
                        <div className="alt-names">
                            {data.alternativeNames.map(item => <p className='alt-name'>{item.trim()}</p>)}
                        </div>
                        <Row className="my-4">
                            <Col xs={5}>
                            <div className='category'>Год производства</div>
                            <div className='category'>Тип</div>
                            <div className='category'>Статус</div>
                            <div className='category'>Студия</div>
                            <div className='category'>Режиссер</div>
                            <div className='category'>Жанры</div>
                            </Col>
                            <Col xs={7}>
                            <div className='category-value'>{data.year}</div>
                            <div className='category-value'>{data.type}</div>
                            <div className='category-value'>{data.status}</div>
                            <div className='position-relative d-flex flex-wrap gap-1 category-value'>{data.studios.length !== 0 ? data.studios.map(item => <div className='mini-block'> {item.name}</div>) : "Неизвестно"}</div>
                            <div className='position-relative d-flex flex-wrap gap-1 category-value'>{data.directors.length !== 0 ? data.directors.map(item => <div className='mini-block'> {item.name}</div>) : "Неизвестно"}</div>
                            <div className='position-relative d-flex flex-wrap gap-1 category-value'>{data.genres.length !== 0 ? data.genres.map(item => <div className='mini-block'> {item.name}</div>): "Неизвестно"}</div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={"4"}>
                    <div className="description">
                        <p className="description-text">
                        {
                            data.description.length <= 400 ?
                            data.description
                            :
                            <>
                                <div>
                                    {isExpanded ? data.description : `${data.description.slice(0, 400)}... `}
                                </div>
                                <div className="expand">
                                    <button onClick={toggleExpand} className='button'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-arrows-expand" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10"/>
                                        </svg>
                                    </button>
                                </div>
                            </>
                        }
                        </p>
                    </div>
                    </Col>
            </Row>
            <Row className='mt-5'>
                <div className='video'>
                    {
                        data.kodik_link ? <iframe title='video' src={data.kodik_link} width="100%" height="800" frameBorder="0" allowFullScreen allow="autoplay *; fullscreen *"></iframe>
                        : <div className="null">
                            Видео недоступно :(
                        </div>
                    }
                </div>
            </Row>
            <Row className='info commets mt-5'>
                <h2 className='anime-title'>Комментарии</h2>
                <Row className='m-0 p-0'>
                    <span className="comment-textarea" onInput={(e) => setComment(e.currentTarget.innerHTML)} data-placeholder="Текст комментария" contentEditable="true" maxLength="5000"></span>
                    <button className="button mb-2" onClick={sendComment}>Отправить</button>
                </Row>
                <hr />
                {
                    comments.length !== 0 ? comments.map(item => 
                        <Row className='comment p-0 mb-3 ms-1'>
                            <Col md={"auto"}>
                                <Image className='avatar-medium' src={`${item.user.avatar}`}/>
                            </Col>
                            <Col md={"10"}>
                                <div className='comment-info'>
                                    <div className='comment-user'>{item.user.login}</div>
                                    <div className='comment-date'>{item.comment_date.replace("T", " : ")}</div>
                                </div>
                                <div className='comment-text'>{item.message}</div>
                            </Col>
                        </Row>
                    )
                    :
                    <div className="p-3">
                        Комментариев пока нет :(
                    </div>
                }
            </Row>
        </div>
    );
};


export default AnimeInfo;