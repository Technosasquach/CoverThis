import * as React from "react";
import { render } from "react-dom";

import Navbar from "./components/Navbar";

import "./public/bootstrap.min.css";

export default class Root extends React.Component {

    componentDidMount() {
        console.log("[CORE] React has loaded");
    }

    componentWillMount() {
        console.log("[CORE] React will load");
    }

    render() {
        return (
            <Navbar>
            </Navbar>
        );
    }
}

render(
    <Root />,
    document.getElementById("root")
);