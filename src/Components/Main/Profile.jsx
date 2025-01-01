import React from 'react';
import { Image } from 'react-bootstrap';
import { useCookies } from "react-cookie";

import './Profile.css';

const clientId = 52894925;
const redirectUri = 'https://api.anininja.ru/api/user/vk_connect';
const link = `https://oauth.vk.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&display=page&response_type=code`;

const Profile = ({ data }) => {
    document.title = `Профиль - ${data.login}`;
    const [, , removeCookie] = useCookies(["access_token"]);

    const signOut = async() => {
        removeCookie("access_token");
        window.location.href = "/";
    }

    return (
        <div className="profile">
            <div className="card">
                <h5 className="card-header">Профиль - {data.login}</h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-auto">
                            <div className="row">
                                <Image className='card-avatar' src={data.avatar} />
                            </div>
                            <div className="row">
                                <button>Загрузить</button>
                            </div>
                        </div>
                        <div className="col">
                            Регистрация: {data.registrationDate}
                            <div>
                                <img src="./vk.svg" alt="VK" />
                                {
                                    data.vkId ?
                                    <button href={link} className='button'>
                                        Отвязать
                                    </button>
                                    :
                                    <button href={link} className='button'>
                                        Привязать
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <button onClick={() => {signOut()}} className='button w-auto'>
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Profile;