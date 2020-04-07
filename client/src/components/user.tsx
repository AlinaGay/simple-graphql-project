import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {UserDetails, Variables} from '../types';

import './user.css';

type State = {
    textQuery: string;
};

type Props = {
    checkboxName: React.RefObject<HTMLInputElement>;
    checkboxPatronymic: React.RefObject<HTMLInputElement>;
    checkboxSurname: React.RefObject<HTMLInputElement>;
}

const generateQuery = (checkboxNameChecked: boolean | null, checkboxPatronymicChecked: boolean | null, checkboxSurnameChecked: boolean | null) : string => 
    `query { me { id ${checkboxNameChecked ? 'name ' : ''}` +
    `${checkboxPatronymicChecked ? 'patronymic ' : ''}` +
    `${checkboxSurnameChecked ? 'surname' : ''} }}`;

export class User extends React.PureComponent<Props>{ 

    state: State = {
        textQuery: `query { me { id  }}`
    };

    textInput = React.createRef<HTMLInputElement>();
    
    handleClick = (): void => {
        const isCheckboxNameChecked: boolean | null= this.props.checkboxName && this.props.checkboxName.current && this.props.checkboxName.current.checked;
        const isCheckboxPatronymicChecked: boolean | null = this.props.checkboxPatronymic && this.props.checkboxPatronymic.current && this.props.checkboxPatronymic.current.checked;
        const isCheckboxSurnameChecked: boolean | null = this.props.checkboxSurname && this.props.checkboxSurname.current && this.props.checkboxSurname.current.checked;

        const customStringQuery = generateQuery(isCheckboxNameChecked, 
            isCheckboxPatronymicChecked, isCheckboxSurnameChecked);
        
            this.setState({textQuery: customStringQuery});
    }

    componentDidMount(){
            this.handleClick();
        }

    render(){

        const isCheckboxNameChecked: boolean | null = this.props.checkboxName && this.props.checkboxName.current && this.props.checkboxName.current.checked;
        const isCheckboxPatronymicChecked: boolean | null = this.props.checkboxPatronymic && this.props.checkboxPatronymic.current && this.props.checkboxPatronymic.current.checked;
        const isCheckboxSurnameChecked: boolean | null = this.props.checkboxSurname && this.props.checkboxSurname.current && this.props.checkboxSurname.current.checked;

        return (
            <Query<UserDetails, Variables>
                query={gql([generateQuery(isCheckboxNameChecked, isCheckboxPatronymicChecked, isCheckboxSurnameChecked)])}
            >
                {({ loading, error, data }) => { 
                    let res: string = '';
                    if(data && data.me && data.me.name){res+=`${data.me.name} `}
                    if(data && data.me && data.me.patronymic){res+=`${data.me.patronymic} `}
                    if(data && data.me && data.me.surname){res+=`${data.me.surname}`}
                    if (loading) return <div>"Loading..."</div>;
                    if (error) return <div>`Error!`</div>;
                    
                    return (
                        <div>
                            <button onClick={this.handleClick}>Показать</button>
                            <input
                                type="text"
                                value={res}
                                className="text-input"
                            />
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default User;
