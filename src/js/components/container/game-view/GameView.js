import React, {Component} from "react";
import PlayerInfo from "../../presentational/player-info/PlayerInfo";
import Board from "../../presentational/board/Board";
import {Card} from 'react-materialize';
import Helpers from '../helpers'

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
const direction = ['vertical', 'horizontal'];

const successMessages = ['Nice shoot!', 'Good!', 'The devil is released!', 'Awesome!'];
const failMessages = ['Oops!', 'Try to make it better', 'Bad shoot', 'ZzzZzzz!'];

let shipPositions = []

class GameView extends Component {

    constructor() {
        super();
        this.successClick = this.successClick.bind(this)
        this.failedClick = this.failedClick.bind(this)
        this.userActionHandler = this.userActionHandler.bind(this)
        this.state = {
            battleground: [],
            battlegroundSolution: [],
            showSolution: false
        }
    }

    componentDidMount() {
        let recoveredGame = JSON.parse(window.localStorage.getItem('playerInfo'))
        this.setState({
            playerName: recoveredGame.playerName,
            failures: recoveredGame.failures,
            attempts: recoveredGame.attempts,
            hits: recoveredGame.hits,
            startTime: recoveredGame.startTime,
            endTime: recoveredGame.endTime == null ? 'IN PROGRESS' : recoveredGame.endTime
        });
        this.createBattleground();
    }


    putShipOnBattleground(ship) {
        let orientation = direction[Helpers.getRandomInt(0, 2)];
        let shipRow;
        let shipColumn;
        let positions = [];

        if (orientation === 'vertical') {
            shipRow = Helpers.getRandomInt(0, (9 - ship));
            shipColumn = Helpers.getRandomInt(1, (columns.length - 1));
            for (let i = 0; i < ship; i++) {
                let position = {'row': rows[shipRow + i], 'column': shipColumn};
                positions.push(position);
            }
        } else {
            shipRow = Helpers.getRandomInt(0, 9);
            shipColumn = Helpers.getRandomInt(1, (columns.length - ship));
            for (let i = 0; i < ship; i++) {
                let position = {'row': rows[shipRow], 'column': shipColumn + i};
                positions.push(position);
            }
        }
        if (Helpers.areRepeatedPositions(shipPositions, positions)) {
            //Retry
            this.putShipOnBattleground(ship);
        } else {
            positions.map(position =>
                shipPositions.push(position)
            );
        }
    }

    defineShipLocations() {
        ships.map(ship => {
            this.putShipOnBattleground(ship);
        });
    }

    createBattleground() {
        let recoveredBattleground = window.localStorage.getItem('battleground');
        if (recoveredBattleground === null) {
            this.defineShipLocations();
            this.setState({
                battleground: this.createBattlegroundMatrix()
            }, () => {
                this.setState({
                    battlegroundSolution: this.state.battleground
                }, () => {
                    window.localStorage.setItem('battleground', JSON.stringify(this.state.battleground));
                    window.localStorage.setItem('battlegroundSolution', JSON.stringify(this.state.battleground));
                });
            });
        } else {
            this.setState({
                battleground: JSON.parse(recoveredBattleground)
            })
        }
    }

    createBattlegroundMatrix() {
        let battleground = []
        rows.map(row => {
            columns.map(column => {
                let position = {'row': row, 'column': column};
                if (Helpers.haveShip(shipPositions, position)) {
                    battleground.push([row, column, 'ship'])
                } else {
                    battleground.push([row, column, 'free'])
                }
            });
        });
        return battleground;
    }


    failedClick(player) {
        if (player.attempts < 1) {
            this.gameOver(player);
        } else {
            player.attempts !== 'INFINITE' ? player.attempts-- : 'INFINITE';
            player.failures++;
            this.setState({
                attempts: player.attempts,
                failures: player.failures
            }, () => {
                window.localStorage.setItem('playerInfo', JSON.stringify(player));
                Helpers.showToast(failMessages[Helpers.getRandomInt(0, (failMessages.length - 1 ))])
            });
        }
    }

    successClick(player) {
        if (player.attempts < 1) {
            this.gameOver(player);
        } else {
            player.attempts !== 'INFINITE' ? player.attempts-- : 'INFINITE';
            player.hits++

            this.setState({
                attempts: player.attempts,
                hits: player.hits
            }, () => {
                window.localStorage.setItem('playerInfo', JSON.stringify(player));
                Helpers.showToast(successMessages[Helpers.getRandomInt(0, (successMessages.length - 1 ))])
            });
        }
    }

    gameOver(player) {
        const battlegroundSolution = JSON.parse(window.localStorage.getItem('battlegroundSolution'));
        player.endTime = Helpers.getCurrentDate();
        this.setState({
            showSolution: true,
            endTime: player.endTime
        }, () => {
            this.setState({
                battlegroundSolution: battlegroundSolution
            }, () => {
                window.localStorage.setItem('playerInfo', JSON.stringify(player));
                Helpers.showToast('GAME OVER');
            });
        });
    }


    userActionHandler(value) {
        let player = JSON.parse(window.localStorage.getItem('playerInfo'))
        let className = value.target.getAttribute('class')
        let sectVal = value.target.getAttribute('value')
        if (sectVal.includes('ship')) {
            this.successClick(player);
        }
        else if (className === 'empty') {
            this.failedClick(player);
        }
    }

    render() {

        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col l3 m12 s12'}>
                        <PlayerInfo playerName={this.state.playerName} failures={this.state.failures} startTime={this.state.startTime}
                                    attempts={this.state.attempts} endTime={this.state.endTime} hits={this.state.hits}/>
                    </div>
                    <Card className='teal lighten-5 black-text col l9 m12 s12' title={'Battleground'}>
                        <div className={'row'}>
                            <div className={'col l6 m12 s12'}>
                                <Board battleground={this.state.battleground} type={'game'}
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