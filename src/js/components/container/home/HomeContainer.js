import React, {Component} from "react";
import {Button, Icon} from 'react-materialize';
import './HomeContainer.scss'
import NewGame from "../new-game/NewGame";
import Helpers from "../helpers";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

class HomeContainer extends Component {

    constructor(props){
        super(props)
    }

    loadGame(){
        let savedGame = Helpers.getParsedObjectFromLocalStorage('playerInfo');
        if(savedGame!==null){
            window.location = "play";
        }else{
            Helpers.showToast('Not found!')
        }
    }

    render() {
        return (
            <div className={'content home'}>
                <div className={'row button-container center'}>
                    <div className={'col l12 m12 s12'}>
                        <NewGame className={'button'} />
                    </div>
                    <div className={'col l12 m12 s12'}>
                        <Button waves='light' className={'button'} onClick={this.loadGame}>Load game<Icon left>autorenew</Icon></Button>
                    </div>

                </div>
            </div>

        );
    }
}

HomeContainer.propTypes = {
    history: PropTypes.object,
};

export default withRouter(HomeContainer);
