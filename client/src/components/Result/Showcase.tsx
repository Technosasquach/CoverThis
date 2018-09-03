import * as React from "react";

import "./Showcase.less";
import { FrontEndController } from "../../service/controller";

export default class Showcase extends React.Component<{frontEnd: FrontEndController},{}> {
    render() {
        return (
            <div className="Showcase">
                <h1>Generated</h1>
                <img src={"data:image/jpeg;base64, " + this.props.frontEnd.result.image} alt="Red dot" />
                <br/>
                <h2>{this.props.frontEnd.book.Title.toString().length > 70 ? this.props.frontEnd.book.Title.toString().substring(0,70) + "..." : this.props.frontEnd.book.Title.toString() }</h2>
                <p>{this.props.frontEnd.book.Aurthor}</p>
                <p>{this.props.frontEnd.book.Category}</p>
                <hr/>
                <p>D1 | Book: {this.props.frontEnd.book.d1.toString().substring(0,5)} Result: {this.props.frontEnd.result.d1.toString().substring(0,5)}</p>
                <p>D2 | Book: {this.props.frontEnd.book.d2.toString().substring(0,5)} Result: {this.props.frontEnd.result.d2.toString().substring(0,5)}</p>
                <p>D3 | Book: {this.props.frontEnd.book.d3.toString().substring(0,5)} Result: {this.props.frontEnd.result.d3.toString().substring(0,5)}</p>
                <hr/>
                <p>{this.props.frontEnd.book.Summary.toString().substring(2,400) + "..."}</p>
            </div>
        );
    }
}