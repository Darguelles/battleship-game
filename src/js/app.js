import HomeContainer from "./components/container/home/HomeContainer";
import React, {Component} from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import Header from "./components/presentational/header/Header";
import ReactDOM from "react-dom";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className={'content'}>
                    <BrowserRouter>
                        <Route path="/" component={HomeContainer}/>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

const wrapper = document.getElementById("main-content");
wrapper ? ReactDOM.render(<App/>, wrapper) : false;