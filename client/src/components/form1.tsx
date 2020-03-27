import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { RouteComponentProps } from '@reach/router';
import * as UserDetailsTypes from '../types';

import './form.css';

const generateQuery = (checkboxNameChecked: boolean, checkboxPatronymicChecked: boolean, checkboxSurnameChecked: boolean) => 
    `query { me { id ${checkboxNameChecked ? 'name ' : ''}` +
    `${checkboxPatronymicChecked ? 'patronymic ' : ''}` +
    `${checkboxSurnameChecked ? 'surname' : ''} }}`;

interface LaunchesProps extends RouteComponentProps {}

const Form: React.FC<LaunchesProps> = () => {

    const checkboxName = React.useRef<HTMLInputElement>(null);
    const checkboxPatronymic = React.useRef<HTMLInputElement>(null);
    const checkboxSurname = React.useRef<HTMLInputElement>(null);
    const textInput = React.useRef<HTMLInputElement>(null);
    
    const customStringQuery = generateQuery(checkboxName.current && checkboxName.current.checked ? true: false,
        checkboxPatronymic.current && checkboxPatronymic.current.checked ? true: false,
        checkboxSurname.current && checkboxSurname.current.checked ? true: false);

    const GET_USER = gql([customStringQuery]);

    const [getUser, { data, loading, error }] = useLazyQuery<UserDetailsTypes.UserDetails,UserDetailsTypes.UserDetails_user>(
        GET_USER,
        { fetchPolicy: "no-cache" }
    );

    const getData = () => {
    
        var res = ``;
        if(data && data.me && data.me.name){res+=`${data.me.name} `}
        if(data && data.me && data.me.patronymic){res+=`${data.me.patronymic} `}
        if(data && data.me && data.me.surname){res+=`${data.me.surname}`}
        if(loading) return `Идет загрузка данных`
        if(error) return `Ошибка данных`

        return res;
    };

    useEffect(() => {
        textInput.current!.value = getData();
    })
        
    

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
            <button onClick={()=>getUser()}>Показать</button>
            <input
                type="text"
                ref={textInput}
            />
    </fieldset>
  );
  
}

export default Form;
