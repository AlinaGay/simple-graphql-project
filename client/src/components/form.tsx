import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {UserDetails, Variables} from '../types';

import './user.css';
import User from './user';

type State = {
    textQuery: string;
};

export class Form extends PureComponent {

    state: State = {
        textQuery: `query { me { id  }}`
    };

    generateQuery = (checkboxNameChecked: boolean, checkboxPatronymicChecked: boolean, checkboxSurnameChecked: boolean) => 
    `query { me { id ${checkboxNameChecked ? 'name ' : ''}` +
    `${checkboxPatronymicChecked ? 'patronymic ' : ''}` +
    `${checkboxSurnameChecked ? 'surname' : ''} }}`;

    checkboxName = React.createRef<HTMLInputElement>();
    checkboxPatronymic = React.createRef<HTMLInputElement>();
    checkboxSurname = React.createRef<HTMLInputElement>();

    handleClick = () => {
        const customStringQuery = this.generateQuery(this.checkboxName.current && this.checkboxName.current.checked ? true: false,
            this.checkboxPatronymic.current && this.checkboxPatronymic.current.checked ? true: false,
            this.checkboxSurname.current && this.checkboxSurname.current.checked ? true: false);

        
        this.setState({textQuery: customStringQuery});

        console.log(this.state.textQuery);
    }

    componentDidMount(){
        this.handleClick();
        console.log('yes');
    }

    render(){
        
        const { textQuery} = this.state;
        return(
            <fieldset>
                <legend>Выбери поле</legend>
                <label>
                    <input
                        type="checkbox"
                        ref={this.checkboxName}
                    />
                    Имя
                </label>
                <label>
                    <input
                        type="checkbox"
                        ref={this.checkboxPatronymic}
                    />
                    Отчество
                </label>
                <label>
                    <input
                        type="checkbox"
                        ref={this.checkboxSurname}
                    />
                    Фамилия
                </label>
                <button onClick={this.handleClick}>Показать</button>
                <User query={gql([textQuery])} />
            </fieldset>
        );
    }
}