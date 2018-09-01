import * as React from "react";

import "./BookListing.less";

import { FrontEndController } from "./../../service/controller";

export default class BookListing extends React.Component<{bookObj: any, frontEnd: FrontEndController},{}> {

    constructor(props: any) {
        super(props);
    }

    // componentDidMount() {
    //     console.log("RENDERING BOOKLIST");
    //     console.log(JSON.stringify(this.props.bookObj));
    // }

    render() {
        return (
            <a href="#" onClick={(event)=>{event.preventDefault(); this.props.frontEnd.bookSelected(this.props.bookObj)}} className="BookListing">
                <div className="ImgHolder">
                    <img src={this.props.bookObj["IMAGE URL"]} height="100%"></img>
                </div>
                <div className="TextHolder">
                    <div>
                        {/* <span className="Title">{this.props.bookObj["TITLE"].length > 30 ? this.props.bookObj["TITLE"].substring(0,30) + "..." : this.props.bookObj["TITLE"]}</span> */}
                        <span className="Title">{this.props.bookObj["TITLE"]}</span>
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