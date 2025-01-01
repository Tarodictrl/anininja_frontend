import React from 'react';
import './Error.css';

const NotFound = () => {
    return (
        <div className='error'>
            <h1 className='number'>404</h1>
            <h2>Упс! Такой страницы не существует :(</h2>
            <p>Возможно, Вы ошиблись ссылкой.</p>
            <button className="btn" onClick={() => window.history.back()}>
                Назад
            </button>
        </div>
    );
};



export default NotFound;