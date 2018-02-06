import React, {Component} from "react";
import './Header.scss'

class Header extends Component {

    render(){
        return(
            <nav className={' battleship-game-header '}>
                <div className={"nav-wrapper container"}>
                    <div>
                        <a href="#" className={"brand-logo"}>Battleship</a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;