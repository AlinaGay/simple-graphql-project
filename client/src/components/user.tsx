import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery, ApolloClient, useApolloClient } from '@apollo/client';
import * as UserDetailsTypes from '../types';

const generateQuery = (checkboxNameChecked: boolean, checkboxPatronymicChecked: boolean, checkboxSurnameChecked: boolean) => 
    `query { me { id ${checkboxNameChecked ? 'name ' : ''}` +
    `${checkboxPatronymicChecked ? 'patronymic ' : ''}` +
    `${checkboxSurnameChecked ? 'surname' : ''} }}`;

function User(props: any) { 

    const client: ApolloClient<any> = useApolloClient();
    console.log(client.watchQuery);
    const textInput = React.createRef<HTMLInputElement>();

    const GET_USER = gql([generateQuery(props.checkboxNameChecked, props.checkboxPatronymicChecked, props.checkboxSurnameChecked)]);

    const [getUser, { data, loading, error }] = useLazyQuery<UserDetailsTypes.UserDetails,UserDetailsTypes.UserDetails_user>(
        GET_USER
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

    return(
        <div>
        <button onClick={()=>getUser()}>Показать</button>
        <input
            type="text"
            ref={textInput}
        />
        </div>
    );
}

export default User;