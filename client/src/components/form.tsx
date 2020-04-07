import React, { PureComponent } from 'react';
import User from './user';

import './form.css';

export class Form extends React.PureComponent {

    checkboxName = React.createRef<HTMLInputElement>();
    checkboxPatronymic = React.createRef<HTMLInputElement>();
    checkboxSurname = React.createRef<HTMLInputElement>();

    render(){
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
                <User
                checkboxName={this.checkboxName}
                checkboxPatronymic={this.checkboxPatronymic}
                checkboxSurname={this.checkboxSurname}
                />
            </fieldset>
        );
    }
}