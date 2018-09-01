import * as React from "react";

import "./Entry.less";

import InfoEntry from "./Entry/InfoEntry";
import LoadingScreen from "./Entry/LoadingScreen";

export default class Entry extends React.Component {
    render() {
        return (
            <div className="EntryPage">
                <InfoEntry/>
                <LoadingScreen/>
            </div>
        );
    }
}