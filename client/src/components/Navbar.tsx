import * as React from "react";

import "./Navbar.less";
import { FrontEndController } from "../service/controller";

export default class Navbar extends React.Component<{frontEnd: FrontEndController},{}> {
    render() {
        return (
            <div className="Navbar">
                <div className="Left">
                    <img src="http://via.placeholder.com/20x20"></img>
                    <span>Cover This</span>
                </div>
                <div className="Right">
                    <a href="" >AI</a>
                    <a href="" >About</a>
                </div>
                <div className="Hamburger">
                    <a href="" >AI</a>
                    <a href="" >About</a>
                </div>
            </div>
        );
    }
}