import React from 'react';
import { Spinner } from 'react-bootstrap';

import './Loading.css';

const Loading = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column text-center" style={{ height: '75vh' }}>
                <div className="spinner">
                    <Spinner animation="border" role="status" variant="white">
                    </Spinner>
                </div>
                <div className="spinner-text">
                    <span>
                        Мы стараемся как можем 😊
                    </span>
                </div>
            </div>
        </>
      );
};

export default Loading;