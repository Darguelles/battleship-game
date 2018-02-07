import React, {Component} from "react";
import {Modal, Button, Icon, Row, Input} from 'react-materialize';

class NewGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameName: '',
            players: '',
            attempts: 'INFINITE',
            attemptsFieldBlocked: true,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.unlockAttemptFields = this.unlockAttemptFields.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            gameName: target.gameName,
            players: target.players,
            attempts: target.attempts
        });
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

    render() {
        return (
            <Modal header='Create game' trigger={<Button waves='light' className={'button'}>New game<Icon left>save</Icon></Button>}>

                <Row>
                    <Input id={'game_name'} s={12} l={6} m={12} label="Game name" value={this.state.gameName}
                           onChange={this.handleInputChange}/>
                    <Input id={'players'} s={12} l={6} m={12} defaultValue='1' type="number" label="Players"
                           value={this.state.players} onChange={this.handleInputChange}/>
                    <Input id={'level-select'}  s={12} l={6} m={12} type='select' label="Level" defaultValue='2' value={this.state.attempts}
                           onChange={this.unlockAttemptFields} ref={'level-select'}>
                        <option disabled value='Choose...'>Choose level</option>
                        <option value='INFINITE'>Easy</option>
                        <option value='100'>Medium</option>
                        <option value='50'>Hard</option>
                        <option value='0'>Custom</option>
                    </Input>
                    <Input id={'attempts'} s={12} l={6} m={12} label="Attempts"
                           disabled={this.state.attemptsFieldBlocked} value={this.state.attempts}
                           onChange={this.handleInputChange}/>

                </Row>

            </Modal>
        )
    }

}

export default NewGame;