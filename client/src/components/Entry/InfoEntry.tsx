import * as React from "react";

import "./InfoEntry.less";

export default class InfoEntry extends React.Component<{payloadFunc: Function},{}> {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div className="InfoEntryPage">
                <div className="InfoContainer">
                    <div className="InfoTitleSection">
                        <h1>Cover This</h1>
                    </div>
                    <div className="InfoDataSection">
                        <h3>Enter Book Title</h3>
                        <input type="text" title="bookTitle"></input>
                    </div>
                </div>
            </div>
        );
    }
}