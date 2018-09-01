import * as React from "react";

import "./BookListing.less";

export default class BookListing extends React.Component<{bookObj: any, callBackFunction: Function},{}> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        console.log("RENDERING BOOKLIST");
        console.log(JSON.stringify(this.props.bookObj));
    }

    render() {
        return (
            <a className="BookListing">
                <div className="ImgHolder">
                    <img src={this.props.bookObj["IMAGE URL"]} height="100%"></img>
                </div>
                <div className="TextHolder">
                    <div>
                        <span className="Title">{this.props.bookObj["TITLE"].length > 30 ? this.props.bookObj["TITLE"].substring(0,30) + "..." : this.props.bookObj["TITLE"]}</span>
                        <br/>
                        <span className="Author">{this.props.bookObj["AURTHOR"]}</span>
                        <br/>
                        <span className="Relevance">Score: {this.props.bookObj["score"]}</span>
                    </div>
                </div>    
            </a>
        );
    }
}