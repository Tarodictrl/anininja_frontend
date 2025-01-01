import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Turnstile } from "@marsidev/react-turnstile";
import './SignInPage.css';
import { useCookies } from 'react-cookie';

const vkClientId = 52894925;
const vkRedirectUri = 'https://api.anininja.ru/api/user/vk_auth';
const vkLink = `https://oauth.vk.com/authorize?client_id=${vkClientId}&redirect_uri=${vkRedirectUri}&display=page&response_type=code`;

const SignInPage = () => {

    const [token, setToken] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [, setCookie] = useCookies(['access_token'], {} );

    const validateToken = async() => {
        if (!token) {
            setError("Ошибка проверки капчи");
        }
        else {
            try {
                const response = await fetch('https://api.anininja.ru/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: login,
                        password: password,
                        token: token,
                    }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    console.log('Успешный вход:', data);
                    setCookie('access_token', data.access_token, { path: '/' });
                    window.location.href = '/';
                } else {
                    setError(data.detail);
                }
            } catch (error) {
                setError('Ошибка соединения с сервером');
                console.error('Ошибка запроса:', error);
            }
        }
    }
    return (
        <div className="sign-in">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Введите email или логин" onChange={(e) => setLogin(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
                    <div className='reset-password'>
                        <a href="/user/reset-password">
                            Забыли пароль?
                        </a>
                    </div>
                </Form.Group>
                <div className="socials">
                    <a href={vkLink}>
                        <img src="./vk.svg" alt="VK"></img>
                    </a>
                </div>
                <Turnstile
                    onSuccess={(token) => {
                        setToken(token);
                    }}
                    retry="auto"
                    refreshExpired="auto"
                    siteKey="0x4AAAAAAAz_8zwMl0R-hkYB"
                />
                {error && <p className="error-message">{error}</p>}
                <div className="d-flex align-center justify-content-between">
                    <Button variant="primary" onClick={() => validateToken()}>
                        Войти
                    </Button>
                    <a href="/registration" className='btn btn-primary w-auto'>
                        Регистрация
                    </a>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;