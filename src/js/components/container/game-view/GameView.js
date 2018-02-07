import React, {Component} from "react";
import PlayerInfo from "../../presentational/player-info/PlayerInfo";

class GameView extends Component {


    render() {
        return (
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col l3 m6 s12'}>
                        <PlayerInfo playerName={'Diego'} failures={0} attempts={50} endTime={'XXXX'} hits={0}/>
                    </div>

                </div>

            </div>

        );
    }
}

export default GameView;