import React, {Component} from "react";
import ReactDOM from "react-dom";

class HomeContainer extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }

    render() {
        return (
            <div id="home-container">
                Home container ready!
            </div>
        );
    }
}

export default HomeContainer;