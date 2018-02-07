import React, {Component} from "react";
import {Card, ProgressBar} from 'react-materialize';
import PropTypes from 'prop-types';
import './PlayerInfo.scss'

class PlayerInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let loader = null;
        if (this.props.attempts === 'INFINITE') {
            loader = <ProgressBar id={'pg-attempt'} progress={100}/>
        } else {
            loader = <ProgressBar progress={parseInt(this.props.attempts)}/>
        }

        return (
            <Card id={'card-player-info'} className='teal lighten-5 black-text' title={this.props.playerName}>
                <div className={"player-info"}>
                    <h6>Turns</h6>
                    <label id={'lbl-attempts'}>{this.props.attempts}</label>
                    {loader}
                    <h6>Hits</h6>
                    <label id={'lbl-hits'} className={"hit"}>{this.props.hits}</label>
                    <h6>Failures</h6>
                    <label id={'lbl-failures'} className={"failure"}>{this.props.failures}</label>
                    <h6>Start time</h6>
                    <label id={'lbl-starttime'}>{this.props.startTime}</label>
                    <h6>Emd time</h6>
                    <label id={'lbl-endtime'}>{this.props.endTime}</label>
                </div>
            </Card>
        );
    }
}

PlayerInfo.propTypes = {
    playerName: PropTypes.string,
    attempts: PropTypes.any,
    hits: PropTypes.number,
    failures: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
};

export default PlayerInfo;