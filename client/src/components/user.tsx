import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {UserDetails, Variables} from '../types';

import './user.css';

const GET_USER= gql`
    query  {
        me {
            id
            name
        }
    }
`;

function User() { 

    const func = () => {
        alert('1');
    }
    return (
        <Query<UserDetails, Variables>
            query={GET_USER}
        >
            {({ loading, error, data }) => { 
                if (loading) return <div>"Loading..."</div>;
                if (error) return <div>`Error!`</div>;

                return (
                    <fieldset>
                    <legend>Выбери поле</legend>
                    <label>
                        <input
                            type="checkbox"
                        />
                        Имя
                    </label>
                    <label>
                        <input
                            type="checkbox"
                        />
                        Отчество
                    </label>
                    <label>
                        <input
                            type="checkbox"
                        />
                        Фамилия
                    </label>
                    <button onClick={func}>Показать</button>
                    <input
                        type="text"
                        value={data!.me.name}
                    />
                </fieldset>
                );
            }}
        </Query>
    );
}

export default User;
