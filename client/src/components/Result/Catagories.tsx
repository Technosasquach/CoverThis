import * as React from "react";

import "./Catagories.less";
import { FrontEndController } from "../../service/controller";

import { All } from "./../../public/renderSupport";
import Catagory from "./Catagories/Catagory";

export default class Catagories extends React.Component<{frontEnd: FrontEndController},{}> {
    render() {
        return (
            <div className="Catagories">
                <h1>Catagories</h1>
                { All.map((val: { cat: string, col: string }) => {
                    return <Catagory text={val.cat} color={val.col} />
                })}
            </div>
        );
    }
}