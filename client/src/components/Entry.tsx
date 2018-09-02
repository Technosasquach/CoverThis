import * as React from "react";

import "./Entry.less";

import InfoEntry from "./Entry/InfoEntry";
import LoadingScreen from "./Entry/LoadingScreen";

import { FrontEndController } from "./../service/controller";
import Particles from "react-particles-js";

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
            <Particles params={{
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
                                    "opacity_min": 0.0,
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
                    }}/>
                { !this.state.showLoading ? <InfoEntry frontEnd={this.props.frontEnd}/> : <LoadingScreen bookObj={this.state.book} frontEnd={this.props.frontEnd}/> }
            </div>
        );
    }
}