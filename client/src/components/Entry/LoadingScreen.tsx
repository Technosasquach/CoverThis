import * as React from "react";
import { LoaderMessages } from "./../../service/loadingMsg";

import "./LoadingScreen.less";

// import Particles from "react-particles-js";
import { FrontEndController } from "../../service/controller";

// const params: IParticlesParams = {
//     "particles": {
//         "number": {
//             "value": 50
//         },
//         "size": {
//             "value": 3
//         }
//     },
//     "interactivity": {
//         "events": {
//             "onhover": {
//                 "enable": true,
//                 "mode": "repulse"
//             }
//         }
//     }
// }

export default class LoadingScreen extends React.Component<{bookObj: any, frontEnd: FrontEndController},{}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="LoadingScreenPage">
                {/* <Particles 
                    params={{
                        "particles": {
                            "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 1600
                            }
                            },
                            "color": {
                                "value": "#ff0099"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "img/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false,
                                "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                                }
                            },
                            "size": {
                                "value": 4.008530152163807,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 176.3753266952075,
                                "color": "#ff0099",
                                "opacity": 0.6333477640418815,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 3.2,
                                "direction": "top-left",
                                "random": true,
                                "straight": false,
                                "out_mode": "out",
                                "bounce": false,
                                "attract": {
                                    "enable": true,
                                    "rotateX": 2485.28869434156,
                                    "rotateY": 2405.118091298284
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                    "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    // "opacity": 8,
                                    // "speed": 3
                                },
                                "repulse": {
                                    "distance": 87.91208791208791,
                                    "duration": 0.4
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                    }}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                /> */}
                <div className="LoadingContainer">
                    <LoadingScreenText bookObj={this.props.bookObj} frontEnd={this.props.frontEnd}/>
                </div>
            </div>
        );
    }
}

export class LoadingScreenText extends React.Component<{bookObj: any, frontEnd: FrontEndController},{currentMsg: string}> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentMsg: LoaderMessages.getRandomMessage()
        }
    }

    msgTime = 1500;
    timeoutA: any;
    timeoutB: any;
    timeoutC: any;
    timeoutObject = setInterval(()=>{
        this.setState({
            currentMsg: LoaderMessages.getRandomMessage()
        });
        this.timeoutA = setTimeout(() => {
            this.setState({
                currentMsg: this.state.currentMsg + "."
            });
        }, this.msgTime / 4)
        this.timeoutB = setTimeout(() => {
            this.setState({
                currentMsg: this.state.currentMsg + "."
            });
        }, this.msgTime / 4 * 2)
        this.timeoutC = setTimeout(() => {
            this.setState({
                currentMsg: this.state.currentMsg + "."
            });
        }, this.msgTime / 4 * 3)
    }, this.msgTime);

    componentWillUnmount() {
        clearInterval(this.timeoutObject);
        clearInterval(this.timeoutA);
        clearInterval(this.timeoutB);
        clearInterval(this.timeoutC);
    }

    render() {
        return (
            <div className="LoadingContent">
                <h1>{this.state.currentMsg}</h1>
                <h3>Calculating: {this.props.bookObj["TITLE"]}</h3>

                <a href="#" className="LoadingBackBtn" onClick={(e)=>{e.preventDefault(); this.props.frontEnd.showData()}}>Back</a>
            </div>
        );
    }
}