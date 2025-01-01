import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Turnstile } from "@marsidev/react-turnstile";
import './SignInPage.css';

const RegistrationPage = () => {

    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); 

    const validate = async (event) => {
        if (!token) {
            setError("Ошибка проверки капчи!");
            return;
        }
        if (!email || !email || !password || !confirmPassword) {
            setError("Заполните все поля!");
            return;
        }
        if (password !== confirmPassword) {
            setError("Пароли не совпадают!");
            return;
        }
        else {
            try {
                const response = await fetch('https://api.anininja.ru/api/user/registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        login: login,
                        password: password,
                        token: token,
                    }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    console.log('Успешный вход:', data);
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
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Введите email" onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="login">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" placeholder="Введите логин" onChange={(e) => setLogin(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control type="password" placeholder="Повтор пароля" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </Form.Group>
                <Turnstile
                    onSuccess={(token) => {
                        setToken(token);
                    }}
                    siteKey="0x4AAAAAAAz_8zwMl0R-hkYB"
                />
                {error && <p className="error-message">{error}</p>}
                <div className="d-flex align-center justify-content-between">
                    <Button variant="primary" className='w-auto' onClick={() => validate()}>
                        Зарегистрироваться
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default RegistrationPage;


