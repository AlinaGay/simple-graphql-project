import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {UserDetails, Variables} from '../types';

import './user.css';

function User(props: any) { 

    const textInput = React.createRef<HTMLInputElement>();

    return (
        <Query<UserDetails, Variables>
            query={props.query}
        >
            {({ loading, error, data }) => { 
                let res = '';
                if(data && data.me && data.me.name){res+=`${data.me.name} `}
                if(data && data.me && data.me.patronymic){res+=`${data.me.patronymic} `}
                if(data && data.me && data.me.surname){res+=`${data.me.surname}`}
                if (loading) return <div>"Loading..."</div>;
                if (error) return <div>`Error!`</div>;
                
                return (
                    <input
                        type="text"
                        value={res}
                    />
                );
            }}
        </Query>
    );
}

export default User;
