import React, {Component} from "react";
import './Section.scss'
import PropTypes from 'prop-types';
import './Section.scss'

class Section extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let className = null;
        if (this.props.status === 'ship') {
            this.props.boardtype === 'game' ? className = 'empty' : className = 'ship';
        } else if (this.props.status === 'free') {
            className = 'empty';
        } else if (this.props.status === 'destroyed') {
            className = 'destroyed';
        }

        this.setState({
            className: className
        })
    }

    render() {
        return (
            <div className={"section"}>
                <div className={this.state.className}   onClick={this.props.clickHandler} value={this.props.section}>

                </div>
            </div>
        );
    }
}

Section.propTypes = {
    section: PropTypes.any,
    status: PropTypes.string,
    boardtype: PropTypes.string,
    someAction: PropTypes.any,
    clickHandler: PropTypes.func,
    onClick: PropTypes.func
};

export default Section;