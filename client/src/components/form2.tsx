import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import * as UserDetailsTypes from '../types';

import './form.css';
import { RouteComponentProps } from '@reach/router';

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

interface LaunchesProps extends RouteComponentProps {}

const Form: React.FC<LaunchesProps> = () => {

    const [getName, { data: nameData, loading: nameLoading, error: nameError }] = useLazyQuery<UserDetailsTypes.UserDetails,UserDetailsTypes.UserDetails_user>(
        GET_NAME
    );

    const [getPatronymic, { data: patronymicData, loading: patronymicLoading, error: patronymicError }] = useLazyQuery<UserDetailsTypes.UserDetails,UserDetailsTypes.UserDetails_user>(
        GET_PATRONYMIC
    );

    const [getSurname, { data: surnameData, loading: surnameLoading, error: surnameError }] = useLazyQuery<UserDetailsTypes.UserDetails,UserDetailsTypes.UserDetails_user>(
        GET_SURNAME
    );

    const checkboxName = React.useRef<HTMLInputElement>(null);
    const checkboxPatronymic = React.useRef<HTMLInputElement>(null);
    const checkboxSurname = React.useRef<HTMLInputElement>(null);
    const textInput = React.useRef<HTMLInputElement>(null);

    const handleNameClick = () => {
        if(checkboxName.current && checkboxName.current.checked){getName()};

        return null;
    }

    const handlePatronymicClick = () => {
        if(checkboxPatronymic.current && checkboxPatronymic.current.checked){getPatronymic()};

        return null;
    }

    const handleSurnameClick = () => {
        if(checkboxSurname.current && checkboxSurname.current.checked){getSurname()};

        return null;
    }    

    const handleClick = () => {
        if(!nameData||!patronymicData||!surnameData){if(textInput&&textInput.current){textInput.current.value='Please, wait...'}}
        if(nameLoading||patronymicLoading||surnameLoading){if(textInput&&textInput.current){textInput.current.value='Loading data...'}}
        if(nameError||patronymicError||surnameError){if(textInput&&textInput.current){textInput.current.value='Oops, error...'}}

        const name = checkboxName.current && checkboxName.current.checked && nameData && nameData.me ? nameData.me.name : '';
        const patronymic = checkboxPatronymic.current && checkboxPatronymic.current.checked  && patronymicData && patronymicData.me ? patronymicData.me.patronymic : '';
        const surname = checkboxSurname.current && checkboxSurname.current.checked && surnameData ? surnameData.me.surname : '';
        const resultInput = name+' '+patronymic+' '+surname;

        if(textInput&&textInput.current){
            textInput.current.value=resultInput
        }
        return null;
    } 
        
    return (
    <fieldset>
        <legend>Выбери поле</legend>
            <label>
                <input
                    type="checkbox"
                    ref={checkboxName}
                    onClick={handleNameClick}
                />
                Имя
            </label>
            <label>
                <input
                    type="checkbox"
                    ref={checkboxPatronymic}
                    onClick={handlePatronymicClick}
                />
                Отчество
            </label>
            <label>
                <input
                    type="checkbox"
                    ref={checkboxSurname}
                    onClick={handleSurnameClick}
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
