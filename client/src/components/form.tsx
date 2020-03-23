import React, { createRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
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

    const { data: nameData, loading: nameLoading, error: nameError } = useQuery(
        GET_NAME
    );

    const { data: patronymicData, loading: patronymicLoading, error: patronymicError } = useQuery(
        GET_PATRONYMIC
    );

    const { data: surnameData, loading: surnameLoading, error: surnameError } = useQuery(
        GET_SURNAME
    );
    
    const checkboxName = React.useRef<HTMLInputElement>(null);
    const checkboxPatronymic = React.useRef<HTMLInputElement>(null);
    const checkboxSurname = React.useRef<HTMLInputElement>(null);
    const textInput = React.useRef<HTMLInputElement>(null)

    const handleClick = () => {
        const name = checkboxName.current && checkboxName.current.checked ? nameData.me.name:'';
        const patronymic = checkboxPatronymic.current && checkboxPatronymic.current.checked ? patronymicData.me.patronymic : '';
        const surname = checkboxSurname.current && checkboxSurname.current.checked ? surnameData.me.surname : '';
    
        const resultInput = name+' '+patronymic+' '+surname;

        return textInput.current!.value=resultInput;
    }

    if (nameLoading||patronymicLoading||surnameLoading) return <p>Loading data...</p>;
    if (nameError||patronymicError||surnameError) return (
        <React.Fragment>
            <p>Oops, error! </p> 
        </React.Fragment>
    );    
        
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
