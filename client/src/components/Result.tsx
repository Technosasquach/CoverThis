import * as React from "react";

import "./Result.less";
import { FrontEndController } from "../service/controller";

import Render from "./Result/Render";

export default class Results extends React.Component<{frontEnd: FrontEndController},{}> {
    render() {
        return (
            <div className="ResultPage">
                {/* <h1>ResultPage</h1> */}
                <Render/>
            </div>
        );
    }
}