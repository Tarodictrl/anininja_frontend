import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";

import './Filter.css';

const Filter = () => {
    const [genres, setGenres] = useState([]);
    const [searchParams, ] = useSearchParams ();
    const [selectedGenre, setSelectedGenre] = useState(searchParams.get("genre") || "");
    const [type, setType] = useState(searchParams.get("type") || "");
    const [status, setStatus] = useState(searchParams.get("status") || "");
    const [year, setYear] = useState(searchParams.get("year") || "");
    const [age, setAge] = useState(searchParams.get("age") || "");
    const [orderBy, setOrderBy] = useState(searchParams.get("order_by") || "");

    let typeArray = ['Сериал', 'Малометражный сериал', 'ONA', 'Спешл', 'OVA', 'Короткометражный фильм', 'Полнометражный фильм'];
    let statusArray = ['онгоинг', 'вышел', 'анонс'];
    let ageArray = ['R-17+ (насилие и/или нецензурная лексика)', 'PG-13 (от 13 лет)', 'R+ (есть сцены легкой эротики)', 'G (для всех возрастов)', 'PG (для детей)'];
    let orderByArray = ['relevance', 'age', 'name'];
    let yearArray = Array.from({length: 56}, (v, k) => 2026 - k);

    typeArray = typeArray.filter((item) => item !== searchParams.get("type"));
    statusArray = statusArray.filter((item) => item !== searchParams.get("status"));
    ageArray = ageArray.filter((item) => item !== searchParams.get("age"));
    orderByArray = orderByArray.filter((item) => item !== searchParams.get("order_by"));
    yearArray = yearArray.filter((item) => item !== searchParams.get("year"));
    let genresArray = genres.filter((item) => item !== searchParams.get("genre"));

    useEffect(() => {
          const getData = async () => {
            try {
                const response = await fetch(
                    `https://api.anininja.ru/api/genre?order_by=name&limit=5`,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }
                );
      
                if (response.ok) {
                      let value = await response.json()
                      setGenres(value.map(item => item.name));
                }
            }
            catch(error) {
                console.log(error);
            }
        };
            getData()
        }, []);

        const getCurrentFilterOption = (value, paramName) => {
            if (searchParams.get(paramName) == null) {
                return;
            }
            else if (value === searchParams.get(paramName)) {
                return <option value selected>{value}</option>
            }
            else {
                return <option>{searchParams.get(paramName)}</option>
            }
        }

    return (
        <Form className='w-100'>
            <fieldset>
                <Form.Group className="mb-3 d-flex">
                    <Form.Control defaultValue={searchParams.get("name")} type="text" name="name" placeholder="Введите название аниме..." />
                </Form.Group>
                <Form.Group className="mb-3 d-flex position-relative">
                    <Form.Select
                        id="SelectGenre"
                        name="genre"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option disabled value="">Выберите жанр</option>
                        {
                            getCurrentFilterOption(selectedGenre, "genre")
                        }
                        {
                            genresArray.map((genre) => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))
                        }
                    </Form.Select>
                    <Button onClick={() => {setSelectedGenre("")}} className="mt-2 remove-button">
                        X
                    </Button>
                </Form.Group>
                <Form.Group className="mb-3 d-flex position-relative">
                    <Form.Select
                        id="SelectGenre"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option disabled value="">Выберите тип</option>
                        {
                            type && <option value={type} selected>{type}</option>
                        }
                        {
                        typeArray.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))
                        }
                    </Form.Select>
                    <Button onClick={() => {setType("")}} className="mt-2 remove-button">
                        X
                    </Button>
                </Form.Group>
                <Form.Group className="mb-3 d-flex position-relative">
                    <Form.Select
                        id="Select"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option disabled value="">Выберите статус</option>
                        {
                            status && <option value={status} selected>{status}</option>
                        }
                        {
                        statusArray.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))
                        }
                    </Form.Select>
                    <Button onClick={() => {setStatus("")}} className="mt-2 remove-button">
                        X
                    </Button>
                </Form.Group>
                <Form.Group className="mb-3 d-flex position-relative">
                    <Form.Select
                        id="Select"
                        name="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option disabled value="">Год выхода аниме</option>
                        {
                            year && <option value={year} selected>{year}</option>
                        }
                        {
                        yearArray.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))
                        }
                    </Form.Select>
                    <Button onClick={() => {setYear("")}} className="mt-2 remove-button">
                        X
                    </Button>
                </Form.Group>
                <Form.Group className="mb-3 d-flex position-relative">
                    <Form.Select
                        id="Select"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    >
                        <option disabled value="">Возрастное ограничение</option>
                        {
                            age && <option value={age} selected>{age}</option>
                        }
                        {
                        ageArray.map((age) => (
                            <option key={age} value={age}>{age}</option>
                        ))
                        }
                    </Form.Select>
                    <Button onClick={() => {setAge("")}} className="mt-2 remove-button">
                        X
                    </Button>
                </Form.Group>
                <Form.Group className="mb-3 position-relative d-flex">
                    <Form.Select
                        id="Select"
                        name="order_by"
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value)}
                    >
                        <option disabled value="">Сортировать по</option>
                        {
                            orderBy && <option value={orderBy} selected>{orderBy}</option>
                        }

                        {
                        orderByArray.map((orderBy) => (
                            <option key={orderBy} value={orderBy}>{orderBy}</option>
                        ))
                        }
                    </Form.Select>
                    <Button onClick={() => {setOrderBy("")}} className="remove-button mt-2">
                        X
                    </Button>
                </Form.Group>
                <Button type="submit" className='w-100'>Искать</Button>
            </fieldset>
        </Form>
    );
};


export default Filter;