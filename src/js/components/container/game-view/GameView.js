import React, {Component} from "react";
import PlayerInfo from "../../presentational/player-info/PlayerInfo";
import Board from "../../presentational/board/Board";

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
const direction = ['vertical', 'horizontal'];

//const successMessages = ['Nice shoot!', 'Good!', 'The devil is released!', 'Awesome!'];
//const failMessages = ['Oops!', 'Try to make it better', 'Bad shoot', 'ZzzZzzz!'];

let shipPositions = []

class GameView extends Component {

    constructor() {
        super();
        this.state = {
            player: null,
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
            hits: recoveredGame.hits
        });
        this.createBattleground();
    }


    putShipOnBattleground(ship) {
        let orientation = direction[this.getRandomInt(0, 2)];
        let shipRow;
        let shipColumn;
        let positions = []

        if (orientation === 'vertical') {
            shipRow = this.getRandomInt(0, (9 - ship));
            shipColumn = this.getRandomInt(1, (columns.length - 1));
            for (let i = 0; i < ship; i++) {
                let position = {'row': rows[shipRow + i], 'column': shipColumn}
                positions.push(position);
            }
        } else {
            shipRow = this.getRandomInt(0, 9);
            shipColumn = this.getRandomInt(1, (columns.length - ship));
            for (let i = 0; i < ship; i++) {
                let position = {'row': rows[shipRow], 'column': shipColumn + i}
                positions.push(position);
            }
        }
        if (this.areRepeatedPositions(shipPositions, positions)) {
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
        //let recoveredBattleground = window.localStorage.getItem('battleground');
        //if (recoveredBattleground === undefined) {


        this.defineShipLocations();
        this.setState({
            battleground: this.createBattlegroundMatrix()
        }, () => {
            window.localStorage.setItem('battleground', JSON.stringify(this.state.battleground));
            window.localStorage.setItem('battlegroundSolution', JSON.stringify(this.state.battleground));
        });

        //} else {
        //   this.setState({
        //  battleground: JSON.parse(recoveredBattleground)
        //    })
        //}
    }

    /*
        failedClick() {
            if (this.player.attempts < 1) {
                this.gameOver();
            } else {
                this.player.attempts !== 'INFINITE' ? this.player.attempts-- : 'INFINITE';
                this.player.failures++;
                window.localStorage.setItem('gameInfo', JSON.stringify(this.player));
                //this.showToast(this.failMessages[this.this.getRandomInt(0, (this.failMessages.length - 1 ))]);
            }
        }

        successClick() {
            if (this.player.attempts < 1) {
                this.gameOver();
            } else {
                this.player.attempts !== 'INFINITE' ? this.player.attempts-- : 'INFINITE';
                this.player.hits++
                window.localStorage.setItem('gameInfo', JSON.stringify(this.player));
                //this.showToast(this.successMessages[this.this.getRandomInt(0, (this.successMessages.length - 1 ))]);
            }
        }

        gameOver() {
            //this.showToast('GAME OVER');
            this.battlegroundSolution = JSON.parse(window.localStorage.getItem('battlegroundSolution'));
            this.player.endTime = new Date();
            this.showSolution = true;
        }
    */

    render() {

        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col l3 m6 s12'}>
                        <PlayerInfo playerName={this.state.playerName} failures={this.state.failures}
                                    attempts={this.state.attempts} endTime={this.state.endTime} hits={this.state.hits}/>
                    </div>

                    <div className={'col l9 m6 s12'}>
                        <Board battleground={this.state.battleground} type={'solution'}/>
                    </div>

                </div>

            </div>

        );
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    areRepeatedPositions(array, array2) {
        let result = false;
        array.map(first => {
            array2.map(second => {
                if (first.row === second.row && first.column === second.column) {
                    result = true;
                }
            });
        });
        return result;
    }

    haveShip(arr, val) {
        return arr.some(pos => pos.row == val.row && pos.column == val.column);
    }

    createBattlegroundMatrix() {
        let battleground = []
        rows.map(row => {
            columns.map(column => {
                let position = {'row': row, 'column': column}
                if (this.haveShip(shipPositions, position)) {
                    battleground.push([row, column, 'ship'])
                } else {
                    battleground.push([row, column, 'free'])
                }
            });
        });
        return battleground;
    }
}

export default GameView;