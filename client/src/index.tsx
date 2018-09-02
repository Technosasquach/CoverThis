import * as React from "react";
import { render } from "react-dom";

// import Navbar from "./components/Navbar";

import "./public/animate.css";
import "./index.less";

import Entry from "./components/Entry";
import Results from "./components/Result";
// import Navbar from "./components/Navbar";

import { FrontEndController } from "./service/controller";

export default class Root extends React.Component<{},{showResults: boolean}> {

    frontEndController = new FrontEndController();

    constructor(props: any) {
        super(props);
        this.state = {
            showResults: false
        }
        this.showResultsPage = this.showResultsPage.bind(this);
    }

    componentDidMount() {
        this.frontEndController.mountResultState(this.showResultsPage);
        console.log("[CORE] React has loaded");
    }
    componentWillMount() { console.log("[CORE] React will load"); }

    showResultsPage(state: boolean) {
        this.setState({
            showResults: state
        });
    }

    render() {
        return (
            <div className="app">
                { this.state.showResults ? <Results frontEnd={this.frontEndController} /> : <Entry frontEnd={this.frontEndController} /> }
                {/* <Navbar frontEnd={this.frontEndController} /> */}
            </div>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);