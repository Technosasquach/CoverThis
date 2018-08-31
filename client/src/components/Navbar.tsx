
import * as React from "react";
import { Link } from "react-router-dom";

import "./Navbar.less";

export default class Root extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="navbar">
                    <div className="left">
                        <Link to="/"><img src="http://via.placeholder.com/20x20"></img></Link>
                        <Link to="/"><span></span></Link>
                    </div>
                    <div className="right">
                        <Link to="/"><span>Dashboard</span></Link>
                        <Link to="/login"><span>Login</span></Link>
                        {/* <Link to="/signup"><span>Sign Up</span></Link> */}
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}
