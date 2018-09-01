import * as React from "react";

import "./Entry.less";

import InfoEntry from "./Entry/InfoEntry";
import LoadingScreen from "./Entry/LoadingScreen";

import { FrontEndController } from "./../service/controller";

export default class Entry extends React.Component<{frontEnd: FrontEndController},{showLoading: boolean}> { //<{changeFunction(obj: any): Function}> {

    constructor(props: any) {
        super(props);
        this.state = {
            showLoading: false
        };
        this.showLoading = this.showLoading.bind(this);
    }

    componentDidMount() {
        this.props.frontEnd.mountInputState(this.showLoading);
    }

    showLoading(state: boolean) {
        this.setState({
            showLoading: state
        })
    }

    render() {
        return (
            <div className="EntryPage">
                { !this.state.showLoading ? <InfoEntry frontEnd={this.props.frontEnd}/> : <LoadingScreen/> }
            </div>
        );
    }
}