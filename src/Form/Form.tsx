import React, { Component } from 'react';
import './Form.css';

interface IState {
    allStates: string[],
    selectedState: string,
    selecetedCity: string,
    allCitiesInState: string[],

}

class Form extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = IState;
    }
}