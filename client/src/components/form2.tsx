import React, { createRef, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './form.css';


const GET_NAME= gql`
    query  {
        me {
            id
            name
        }
    }
`;

const GET_PATRONYMIC= gql`
    query  {
        me {
            id
            patronymic
        }
    }
`;

const GET_SURNAME= gql`
    query  {
        me {
            id
            surname
        }
    }
`;

function Form () {

    const [getName, { data: nameData }] = useLazyQuery(
        GET_NAME
    );

    const [getPatronymic, { data: patronymicData }] = useLazyQuery(
        GET_PATRONYMIC
    );

    const [getSurname, { data: surnameData }] = useLazyQuery(
        GET_SURNAME
    );

    const checkboxName = React.useRef<HTMLInputElement>(null);
    const checkboxPatronymic = React.useRef<HTMLInputElement>(null);
    const checkboxSurname = React.useRef<HTMLInputElement>(null);
    const textInput = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if(checkboxName.current && checkboxName.current.checked){getName()};
        if(checkboxPatronymic.current && checkboxPatronymic.current.checked){getPatronymic()};
        if(checkboxSurname.current && checkboxSurname.current.checked){getSurname()};

        return null;
    } 
        
    return (
    <fieldset>
        <legend>Выбери поле</legend>
            <label>
                <input
                    type="checkbox"
                    ref={checkboxName}
                />
                Имя
            </label>
            <label>
                <input
                    type="checkbox"
                    ref={checkboxPatronymic}
                />
                Отчество
            </label>
            <label>
                <input
                    type="checkbox"
                    ref={checkboxSurname}
                />
                Фамилия
            </label>
            <button onClick={handleClick}>Показать</button>
            <input
                type="text"
                ref={textInput}
            />
    </fieldset>
  );
  
}

export default Form;
