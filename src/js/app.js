import HomeContainer from "./components/container/home/HomeContainer";
import React, {Component} from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Header from "./components/presentational/header/Header";
import ReactDOM from "react-dom";
import GameView from "./components/container/game-view/GameView";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <BrowserRouter >
                    <div>
                        <Switch>
                            <Route exact path="/" component={HomeContainer}/>
                            <Route path="/play" component={GameView}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

const wrapper = document.getElementById("main-content");
wrapper ? ReactDOM.render(<App/>, wrapper) : false;