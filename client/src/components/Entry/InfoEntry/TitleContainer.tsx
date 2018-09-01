import * as React from "react";

import "./InfoEntry.less";

export default class TitleContainer extends React.Component<{bookSelection: Function, summarySelection: Function},{}> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="InfoTitleSection">
                <h1>Cover This</h1>
                <div className="InfoTitleButtonHolder">
                    <a href=""></a>
                    <a href=""></a>
                </div>
            </div>
        );
    }
}