import React, {Component} from "react";
import './Board.scss'
import Section from "../section/Section";
import PropTypes from 'prop-types';

class Board extends Component {

    constructor(props) {
        super(props);
        this.retrieveSection = this.retrieveSection.bind(this);
        this.state = {
            battleground: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.battleground !== this.props.battleground) {
            this.setState({battleground: nextProps.battleground});
        }
    }

    retrieveSection(section) {
        let selection = section.target.getAttribute('value').split(',')
        console.log(selection)
        if (selection[2] == 'clicked' || selection[2] == 'destroyed') {
            //do anything
        } else if (selection[2] == 'free') {
            console.log('free')
            this.updateBattlewground(selection, 'clicked')
            //this.attemptFailedAction();
        } else if (selection[2] == 'ship') {
            this.updateBattlewground(selection, 'destroyed')
            console.log('destroyed')
            //this.attemptSuccessAction();
        }
    }

    updateBattlewground(section, status) {
        let battleground = this.getBattlegroundFromLocalStorage();
        console.log(battleground)
        console.log(section)
        battleground.map(element => {
            if (element[0] === section[0] && element[1] === parseInt(section[1])) {
                console.log('chi')
                element[2] = status;
            }
        });

        this.setState({
            battleground: battleground
        }, () => {
            this.saveBattlegroundToLocalStorage(battleground);
        });
    }

    render() {

        let sections = this.state.battleground;

        var elelemtns = [];
        for (var i = 0; i < sections.length; i++) {
            elelemtns.push(<Section key={i} status={sections[i][2]} boardtype={this.props.type} section={sections[i]}
                                    clickHandler={this.retrieveSection}/>);
        }

        return (
            <div className={"battleground container"} onClick={this.props.actionHandler}>
                {elelemtns}
            </div>

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
    type: PropTypes.string,
    actionHandler: PropTypes.func
};

export default Board;