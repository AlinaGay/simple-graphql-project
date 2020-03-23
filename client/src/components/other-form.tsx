import React, { useState, createRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USER= gql`
    query  {
        me {
            id
            name
            patronymic
            surname
        }
    }
`;

function OtherForm () {

    const { data, loading, error, refetch } = useQuery(GET_USER);
    const [greeting, setGreeting] = useState(
        ''
      );
    
    if (loading) return <p>Loading data...</p>;
    if (error) return (
        <React.Fragment>
            <p>Oops, error! </p> 
            <button onClick={() => refetch()}>Please try again!</button>
        </React.Fragment>
    );    
        
    return (
    <React.Fragment>
        <div className="container">
            <label>
                <input
                    type="checkbox"
                    onChange={() => setGreeting(data.me.name)}
                />
                Имя
            </label>
            <label>
                <input
                    type="checkbox"
                    onChange={() => setGreeting(data.me.patronymic)}
                />
                Отчество
            </label>
            <label>
                <input
                    type="checkbox"
                    onChange={event => setGreeting(data.me.surname)}
                />
                Фамилия
            </label>
            <input
                type="text"
                value={greeting}
            />
        </div>
    </React.Fragment>
  );
  
}

export default OtherForm;
