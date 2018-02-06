import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Button, Icon} from 'react-materialize'

class HomeContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            hey: [ ]
        };
    }

    render() {
        return (
            <div id="home-container">

                <Button waves='light'>New game<Icon left>save</Icon></Button>
                <Button waves='light'>Load game<Icon left>save</Icon></Button>

            </div>
        );
    }
}

export default HomeContainer;

const wrapper = document.getElementById("main-content");
wrapper ? ReactDOM.render(<HomeContainer/>, wrapper) : false;