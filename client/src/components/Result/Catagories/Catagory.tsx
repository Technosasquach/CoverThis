import * as React from "react";

import "./Catagory.less";

export default class Catagory extends React.Component<{text: string, color: string},{}> {
    render() {
        return (
            <div className="Catagory">
                <div className="ColourContainer" style={{backgroundColor: this.props.color}}>
                </div>
                <div className="TextContainer">
                    <span>{this.props.text}</span>  
                </div>
            </div>
        );
    }
}