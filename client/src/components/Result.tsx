import * as React from "react";

import "./Result.less";
import { FrontEndController } from "../service/controller";

import Render from "./Result/Render";
import Catagories from "./Result/Catagories";
import Showcase from "./Result/Showcase";

export default class Results extends React.Component<{frontEnd: FrontEndController},{}> {
    render() {
        return (
            <div className="ResultPage">
                <Render frontEnd={this.props.frontEnd}/>
                <Catagories frontEnd={this.props.frontEnd} />
                <Showcase frontEnd={this.props.frontEnd} />
            </div>
        );
    }
}