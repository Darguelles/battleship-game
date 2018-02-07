import React, {Component} from "react";
import {Card, ProgressBar} from 'react-materialize';
import PropTypes from 'prop-types';
import './PlayerInfo.scss'

class PlayerInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attempts: this.props.attempts,
            hits: this.props.hits,
            failures: this.props.failures,
            endTime: this.props.endTime
        };
    }

    render() {
        return (
            <Card className='teal lighten-5 black-text' title={this.props.playerName}>
                <div className={"player-info"}>
                    <h6>Turns</h6>
                    <label>{this.state.attempts}</label>
                    <ProgressBar progress={this.state.attempts}/>
                    <h6>Hits</h6>
                    <label className={"hit"}>{this.state.hits}</label>
                    <h6>Failures</h6>
                    <label className={"failure"}>{this.state.failures}</label>
                    <h6>Start time</h6>
                    <label>${this.state.startTime}</label>

                    <h6>Emd time</h6>
                    <label>${this.state.endTime}</label>
                </div>
            </Card>
        );
    }
}

PlayerInfo.propTypes = {
    playerName: PropTypes.string,
    attempts: PropTypes.number,
    hits: PropTypes.number,
    failures: PropTypes.number,
    endTime: PropTypes.string
};

export default PlayerInfo;