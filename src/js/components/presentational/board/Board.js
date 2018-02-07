import React, {Component} from "react";
import './Board.scss'
import Section from "../section/Section";
import PropTypes from 'prop-types';
import Helpers from "../../container/helpers";

class Board extends Component {

    constructor(props) {
        super(props);
        this.retrieveSection = this.retrieveSection.bind(this);
        this.state = {
            battleground: []
        }
    }

    componentDidMount() {
        this.setState({
            battleground: this.props.battleground
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.battleground !== this.props.battleground) {
            this.setState({battleground: nextProps.battleground});
        }
    }

    retrieveSection(section) {
        let selection = section.target.getAttribute('value').split(',')
        if (selection[2] === 'clicked' || selection[2] === 'destroyed') {
            //do anything
        } else if (selection[2] === 'free') {
            this.updateBattlewground(selection, 'clicked')
        } else if (selection[2] === 'ship') {
            this.updateBattlewground(selection, 'destroyed')
        }
    }

    updateBattlewground(section, status) {
        let battleground = Helpers.getFromLocalStorage('battleground');
        battleground.map(element => {
            if (element[0] === section[0] && element[1] === parseInt(section[1])) {
                element[2] = status;
            }
        });

        this.setState({
            battleground: battleground
        }, () => {
            Helpers.saveToLocalStorage(battleground, 'battleground')
        });
    }

    render() {
        let sections = this.state.battleground;

        let elelemtns = [];
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
}

Board.propTypes = {
    battleground: PropTypes.array,
    type: PropTypes.string,
    actionHandler: PropTypes.func
};

export default Board;