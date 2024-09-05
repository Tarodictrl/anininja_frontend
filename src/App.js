import React from 'react';

import './App.css';
import Header from './Components/Header/Header';
import Authorization from './Components/Authorization/Authorization';
import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main'

import Search from './Components/Search/Search';

function App() {

  return (
    <div className="App">
      <div className="App-top">
        <Authorization />
      </div>
      <header className="App-header">
        <Header />
      </header>
      <div className='bg-dark pt-5'>
        <Search />
        <Main />
      </div>
      <footer className='App-footer'>
        <Footer />
      </footer>
    </div>
  );
}   

export default App;