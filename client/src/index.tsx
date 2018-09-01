import * as React from "react";
import { render } from "react-dom";

// import Navbar from "./components/Navbar";

// import "./public/bootstrap.min.css";
import "./index.less";

import Entry from "./components/Entry";
import Results from "./components/Result";

export default class Root extends React.Component {

    componentDidMount() { console.log("[CORE] React has loaded"); }
    componentWillMount() { console.log("[CORE] React will load"); }

    searchTrig() {

    }

    render() {
        return (
            <div className="app">
                <Entry payloadFunc={this.searchTrig}/>
                <Results/>
            </div>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);