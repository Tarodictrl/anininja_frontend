import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer p-0 m-0 w-100 data-bs-theme-dark'>
            <div className="text-center p-3">
                <div className="p-2">
                    <span>
                        Все видео на сайте предоставлены только для ознакомления.
                    </span>
                </div>
                <div className="p-2">
                    <span>
                        © 2024 Copyright:
                        <a href="https://anininja.ru/"> anininja.ru</a>. 
                        Все права защищены.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;