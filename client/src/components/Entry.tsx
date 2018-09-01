import * as React from "react";

import "./Entry.less";

import InfoEntry from "./Entry/InfoEntry";
import LoadingScreen from "./Entry/LoadingScreen";

import { FrontEndController } from "./../service/controller";

export default class Entry extends React.Component<{frontEnd: FrontEndController},{showLoading: boolean, book: any}> { //<{changeFunction(obj: any): Function}> {

    constructor(props: any) {
        super(props);
        this.state = {
            showLoading: false,
            book: []
        };
        this.showLoading = this.showLoading.bind(this);
        this.bookPassthrough = this.bookPassthrough.bind(this);
    }

    componentDidMount() {
        this.props.frontEnd.mountInputState(this.showLoading);
        this.props.frontEnd.mountBookSelectionPassThrough(this.bookPassthrough);
    }

    showLoading(state: boolean) {
        this.setState({
            showLoading: state
        })
    }

    bookPassthrough(book: any) {
        this.setState({
            book: book
        })
    }

    render() {
        return (
            <div className="EntryPage">
                { !this.state.showLoading ? <InfoEntry frontEnd={this.props.frontEnd}/> : <LoadingScreen bookObj={this.state.book}/> }
            </div>
        );
    }
}