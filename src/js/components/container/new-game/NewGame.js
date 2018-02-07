import React, {Component} from "react";
import {Button, Icon, Input, Modal, Row} from 'react-materialize';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

class NewGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameName: '',
            players: '1',
            attempts: 'INFINITE',
            attemptsFieldBlocked: true,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.unlockAttemptFields = this.unlockAttemptFields.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({[target.name]: target.value});
    }

    unlockAttemptFields(event) {
        let currentAttempts = event.target.value;
        let locked = true;
        if (currentAttempts == '0') {
            locked = false;
        }
        this.setState({
            attempts: currentAttempts,
            attemptsFieldBlocked: locked
        })
    }

    startGame() {
        let playerInfo = {
            'playerName': this.state.gameName,
            'attempts': this.state.attempts,
            'startTime': new Date(),
            'hits': 0,
            'failures': 0
        };
        if (playerInfo.playerName !== '' && playerInfo.attempts !== '') {
            window.localStorage.setItem('playerInfo', JSON.stringify(playerInfo));
            this.props.history.push("play");
        }
    }

    render() {
        return (
            <Modal header='Create game'
                   trigger={<Button waves='light' className={'button'}>New game<Icon left>play_arrow</Icon></Button>}
                   actions={<Button waves='light' className={'button'} onClick={this.startGame}>Play!<Icon
                       left>done</Icon></Button>}>

                <Row>
                    <Input id={'game_name'} s={12} l={6} m={12} label="Game name" value={this.state.gameName}
                           name={'gameName'}
                           onChange={this.handleInputChange} validate={true}/>
                    <Input id={'players'} s={12} l={6} m={12} defaultValue='1' type="number" label="Players"
                           name={'players'}
                           value={this.state.players} onChange={this.handleInputChange}/>
                    <Input id={'level-select'} s={12} l={6} m={12} type='select' label="Level" defaultValue='2'
                           value={this.state.attempts}
                           onChange={this.unlockAttemptFields}>
                        <option disabled value='Choose...'>Choose level</option>
                        <option value='INFINITE'>Easy</option>
                        <option value='100'>Medium</option>
                        <option value='50'>Hard</option>
                        <option value='0'>Custom</option>
                    </Input>
                    <Input id={'attempts'} s={12} l={6} m={12} label="Attempts" name={'attempts'}
                           disabled={this.state.attemptsFieldBlocked} value={this.state.attempts}
                           onChange={this.handleInputChange}/>
                </Row>

            </Modal>
        )
    }

}

NewGame.propTypes = {
    history: PropTypes.object,
};

export default withRouter(NewGame);