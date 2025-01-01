import React, { useState } from 'react';

import './Search.css';

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="search-container">
          <button onClick={toggleDropdown} className="search-button">
            <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" data-tid="Search">
                <path fillRule="evenodd" clipRule="evenodd" d="M16.4 11a5.9 5.9 0 1 1-11.8 0 5.9 5.9 0 0 1 11.8 0Zm-1.044 6.977a8.5 8.5 0 1 1 2.121-2.121l4.084 4.083-2.122 2.122-4.083-4.084Z" fill="#fff"></path>
            </svg>
          </button>

            <div className={`dropdown ${isOpen ? 'open' : ''}`}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Введите запрос..."
                    className="search-input"
                />
                {results.length > 0 && (
                    <ul className="results-list">
                    {results.map((result, index) => (
                        <li key={index} className="result-item">
                        {result}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
      );
};


export default Search;