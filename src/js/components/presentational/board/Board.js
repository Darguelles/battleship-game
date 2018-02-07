import React, {Component} from "react";
import './Board.scss'
import Section from "../section/Section";
import PropTypes from 'prop-types';
import {Card} from 'react-materialize';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            battleground: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.battleground !== this.props.battleground) {
            this.setState({battleground: nextProps.battleground});
        }
    }

    retrieveSection(section){
        let selection = section.target.getAttribute('value').split(',')
        console.log(selection)
        if (section[2] === 'clicked' || section[2] === 'destroyed') {
            //do anything
        } else if (section[2] === 'free') {
            this.updateBattlewground(section, 'clicked')
            //this.attemptFailedAction();
        } else if (section[2] === 'ship') {
            this.updateBattlewground(section, 'destroyed')
            //this.attemptSuccessAction();
        }
    }

    updateBattlewground(section, status) {
        let battleground = this.getBattlegroundFromLocalStorage();
        battleground.map(element => {
            if (element[0] === section[0] && element[1] === section[1]) {
                element[2] = status;
            }
        });
        this.saveBattlegroundToLocalStorage(battleground);
    }

    render() {

        let sections = this.state.battleground;

        var elelemtns = [];
        for (var i = 0; i < sections.length; i++) {
            elelemtns.push(<Section key={i} status={sections[i][2]} boardtype={this.props.type} section={sections[i]} clickHandler={this.retrieveSection}/>);
        }

        return (
            <Card className='teal lighten-5 black-text' title={'Battleground'}>
                <div className={"battleground"}>
                    {elelemtns}
                </div>
            </Card>
        );
    }

    getBattlegroundFromLocalStorage() {
        return JSON.parse(window.localStorage.getItem('battleground'));
    }

    saveBattlegroundToLocalStorage(battleground) {
        window.localStorage.setItem('battleground', JSON.stringify(battleground));
    }
}

Board.propTypes = {
    battleground: PropTypes.array,
    type: PropTypes.string
};

export default Board;