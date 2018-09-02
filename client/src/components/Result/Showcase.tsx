import * as React from "react";

import "./Showcase.less";
import { FrontEndController } from "../../service/controller";

export default class Showcase extends React.Component<{frontEnd: FrontEndController},{}> {
    render() {
        return (
            <div className="Showcase">
                <h1>Generated</h1>
                <img src={"data:image/jpeg;base64, " + this.props.frontEnd} alt="Red dot" />
            </div>
        );
    }
}