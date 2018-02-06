import React, {Component} from "react";
import {Button, Icon} from 'react-materialize';
import './HomeContainer.scss'

class HomeContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            hey: []
        };
    }

    render() {
        return (
            <div className={'content home'}>
                <div className={'row button-container center'}>
                    <div className={'col l12 m12 s12'}>
                        <Button waves='light' className={'button'}>New game<Icon left>save</Icon></Button>
                    </div>
                    <div className={'col l12 m12 s12'}>
                        <Button waves='light' className={'button'}>Load game<Icon left>save</Icon></Button>
                    </div>

                </div>
            </div>

        );
    }
}

export default HomeContainer;
