/* main.js */

import React from 'react';
import { render } from 'react-dom';
import TestOne from './TestOne.js';
import TestTwo from './TestTwo.js';

export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            isActive: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        var active = !this.state.isActive;
        this.setState({ isActive: active });
    }

    render() {
        return (
            <div>
                <input type="button" onClick={this.handleClick} value="Press Me!"/>
                {this.state.isActive ? <TestOne /> : <TestTwo />}
            </div>      
        );
    }
};

var myElement = document.getElementById('content');

render(<Main />, myElement);