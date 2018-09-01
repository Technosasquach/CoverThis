import * as React from "react";

import "./Entry.less";

import InfoEntry from "./Entry/InfoEntry";
import LoadingScreen from "./Entry/LoadingScreen";

export default class Entry extends React.Component<{payloadFunc: Function}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="EntryPage">
                <InfoEntry payloadFunc={this.props.payloadFunc}/>
                <LoadingScreen/>
            </div>
        );
    }
}