import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink }  from 'react-router-dom';
import Image from 'react-bootstrap/Image';

import './Header.css'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
        const getData = async () => {
          try {
              const response = await fetch(
                  `https://api.anininja.ru/api/user/profile`,
                  {
                      method: 'GET',
                      credentials: "include",
                      headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                      },
                  }
              );
    
              if (response.ok) {
                  let value = await response.json();
                  setUserData(value);
              }
          }
          catch(error) {
              console.log(error);
          }
          };
          getData();
      }, []);
  return (
        <Navbar className='header p-0'>
          <Container d="flex" flex="wrap">
            <Navbar.Brand href="/" className='p-0 m-0'>
              <Image src="/logo.png" width={90} />
            </Navbar.Brand>
            <Nav>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'navigate active' : 'navigate')}>
                    <span className='ps-1'>Главная</span>
                </NavLink>
                <NavLink to="/anime/catalog" className={({ isActive }) => (isActive ? 'navigate active' : 'navigate')}>
                    <span className='ps-1'>Аниме</span>
                </NavLink>
                <a href="/anime/random" className='navigate'>
                    <span className='ps-1'>Случайное</span>
                </a>
            </Nav>
            {
              userData ?
              <div className="profile navigate">
                <a href="/profile">
                  <button className="avatar-button" onClick={toggleMenu}>
                    <Image className='avatar-small' src={userData.avatar}/>
                  </button>
                </a>
              </div>
              :
              <div className="signin navigate">
                <a href="/sign_in">
                  <button className="button" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                      <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                    Войти
                  </button>
                </a>
              </div>
            }
            <div className="menu">
              <button className="button" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
              </button>
              <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
                <ul>
                  <li><a href="/">Главная</a></li>
                  <li><a href="/anime/catalog">Аниме</a></li>
                  <li><a href="/films/catalog">Фильмы</a></li>
                  {
                    userData ?
                    <li><a href="/user/profile">Профиль</a></li>
                    :
                    <li><a href="/sing_in">Войти</a></li>
                  }
                </ul>
              </nav>
            </div>
          </Container>
        </Navbar>
    );
};

export default Header;