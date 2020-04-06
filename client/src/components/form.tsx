import React from 'react';
import User from './user';

import './form.css';

export class Form extends React.PureComponent {

    checkboxName = React.createRef<HTMLInputElement>();
    checkboxPatronymic = React.createRef<HTMLInputElement>();
    checkboxSurname = React.createRef<HTMLInputElement>();
    
    render(){
        const isCheckboxNameChecked = this.checkboxName && this.checkboxName.current && this.checkboxName.current.checked;
        const isCheckboxPatronymicChecked =this.checkboxPatronymic && this.checkboxPatronymic.current && this.checkboxPatronymic.current.checked
        const isCheckboxSurnameChecked = this.checkboxSurname && this.checkboxSurname.current && this.checkboxSurname.current.checked;

        return (
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
                        checkboxNameChecked={isCheckboxNameChecked}
                        checkboxPatronymicChecked={isCheckboxPatronymicChecked}
                        checkboxSurnameChecked={isCheckboxSurnameChecked}
                    />
            </fieldset>
        );
    }
}

export default Form;
