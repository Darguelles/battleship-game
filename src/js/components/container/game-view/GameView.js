import React, {Component} from "react";
import PlayerInfo from "../../presentational/player-info/PlayerInfo";
import Board from "../../presentational/board/Board";
import {Card} from 'react-materialize';
import Helpers from '../helpers'
import GameService from '../../../services/game/GameService'

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

const successMessages = ['Nice shoot!', 'Good!', 'The devil is released!', 'Awesome!'];
const failMessages = ['Oops!', 'Try to make it better', 'Bad shoot', 'ZzzZzzz!'];

let shipPositions = []

class GameView extends Component {

    constructor() {
        super();
        this.service = new GameService();
        this.userActionHandler = this.userActionHandler.bind(this)
        this.state = {
            battleground: [],
            battlegroundSolution: [],
            showSolution: false
        }
    }

    componentDidMount() {
        let playerInfo = Helpers.getParsedObjectFromLocalStorage('playerInfo');
        if (playerInfo !== null) {
            this.setState({
                playerName: playerInfo.playerName,
                failures: playerInfo.failures,
                attempts: playerInfo.attempts,
                hits: playerInfo.hits,
                startTime: playerInfo.startTime,
                endTime: playerInfo.endTime == null ? 'IN PROGRESS' : playerInfo.endTime
            });
            this.startGame();
        } else {
            Helpers.showToast('No game created yet!')
            //TODO Take to new game scene
        }
    }

    startGame() {
        let savedBattleground = this.service.getSavedGame();
        if (savedBattleground === null) {
            this.createBattleground();
        } else {
            this.setState({
                battleground: JSON.parse(savedBattleground)
            })
        }
    }

    createBattleground() {
        this.defineShipLocations();
        this.setState({
            battleground: this.service.createBattlegroundMatrix(rows, columns, shipPositions)
        }, () => {
            this.setState({
                battlegroundSolution: this.state.battleground
            }, () => {
                this.service.saveBattleground(this.state.battleground)
                this.service.saveSolution(this.state.battleground)
            });
        });
    }

    defineShipLocations() {
        ships.map(ship => {
            this.putShipOnBattleground(ship);
        });
    }

    putShipOnBattleground(ship) {
        let shipLocation = this.service.retrieveShipPositions(ship, columns, rows)
        if (Helpers.areRepeatedPositions(shipPositions, shipLocation)) {
            //Retry
            this.putShipOnBattleground(ship);
        } else {
            shipLocation.map(position =>
                shipPositions.push(position)
            );
        }
    }

    gameOver(player) {
        const battlegroundSolution = Helpers.getParsedObjectFromLocalStorage('battlegroundSolution');
        player.endTime = Helpers.getCurrentDate();
        this.setState({
            showSolution: true,
            endTime: player.endTime
        }, () => {
            this.setState({
                battlegroundSolution: battlegroundSolution
            }, () => {
                Helpers.saveToLocalStorage('playerInfo', player);
                Helpers.showToast('GAME OVER');
            });
        });
    }

    processAction(player) {
        this.setState({
            attempts: player.attempts,
            hits: player.hits,
            failures: player.failures
        });
    }

    userActionHandler(value) {
        let player = Helpers.getParsedObjectFromLocalStorage('playerInfo');
        let className = value.target.getAttribute('class');
        let sectVal = value.target.getAttribute('value');
        if (player.attempts < 1) {
            this.gameOver(player);
        } else if (sectVal !== null && sectVal.includes('ship')) {
            player = this.service.saveAction(player, 'SUCCESS');
            this.processAction(player);
            Helpers.showToast(successMessages[Helpers.getRandomInt(0, (successMessages.length - 1 ))])
        } else if (className === 'empty') {
            player = this.service.saveAction(player, 'FAILURE');
            this.processAction(player);
            Helpers.showToast(failMessages[Helpers.getRandomInt(0, (failMessages.length - 1 ))])
        }
    }

    render() {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col l3 m12 s12'}>
                        <PlayerInfo playerName={this.state.playerName} failures={this.state.failures}
                                    startTime={this.state.startTime}
                                    attempts={this.state.attempts} endTime={this.state.endTime} hits={this.state.hits}/>
                    </div>
                    <Card className='teal lighten-5 black-text col l9 m12 s12' title={'Battleground'}>
                        <div className={'row'}>
                            <div className={'col l6 m12 s12'}>
                                <Board battleground={this.state.battleground} type={'game'} id={'game-battleground'}
                                       actionHandler={this.userActionHandler}/>
                            </div>
                            {this.state.showSolution ? (
                                <div className={'col l4 m12 s12'}>
                                    <Board battleground={this.state.battlegroundSolution}
                                           type={'solution'}/>
                                </div>
                            ) : ( null )}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default GameView;