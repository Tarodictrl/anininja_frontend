import React from 'react';
import style from './ErrorPage.module.css';

const ErrorPage = () => {
    return (
        <div className={style.errorPage}>
            <h1>Oops!</h1>
            <p>Not Found</p>
        </div>
    );
};

export default ErrorPage;