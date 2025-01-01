import React from 'react';
import './Error.css';

const Error = ({ error }) => {
    return (
        <div className='error'>
            <h1 className='number'>{error}</h1>
            <h2>Упс! Мы не можем обработать запрос :(</h2>
            <p>Попробуйте перезагрузить страницу или зайдите позже.</p>
            <button className="btn" onClick={() => window.history.back()}>
                Назад
            </button>
        </div>
    );
};



export default Error;