import * as React from "react";
import axios, { AxiosResponse } from "axios";

import "./InfoEntry.less";
import BookListing from "./BookListing";
// import Particles from "react-particles-js";

import { FrontEndController } from "./../../service/controller";

interface ResponseObj {
    ref: string,
    score: number
}

export default class InfoEntryWrapper extends React.Component<{
    frontEnd: FrontEndController
},{
    searchArea: string,
    recentSearch: ResponseObj[],
    books: any[],
    searched: boolean
}> {


    // Render
    // -----------------------------

    render() {
        return (
            <div className="app">
                {/* <Particles params={{
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
                    }}/> */}
                <InfoEntry frontEnd={this.props.frontEnd}/>
            </div>
        );
    }
}

export class InfoEntry extends React.Component<{
    frontEnd: FrontEndController
},{
    searchArea: string,
    recentSearch: ResponseObj[],
    books: any[],
    searched: boolean,
    disappeared: boolean
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchArea: "",
            recentSearch: [],
            books: [],
            searched: false,
            disappeared: false
        }
    }

    // Search Functions
    // -----------------------------

        handleSearchChange(event: any) {
            this.setState({
                searchArea: event.target.value
            });
        }

        searchBooks() {
            this.removeBooks();
            axios.post(
                `/search/${this.state.searchArea}`,
            ).then((response: AxiosResponse) => {
                // console.log("Response: " + JSON.stringify(response.data));
                this.setState({
                    recentSearch: response.data,
                    searched: true
                })
                setTimeout(() => {
                    this.setState({
                        disappeared: true
                    })
                }, 200)
                this.searchToBooks();
            });
        }

        searchToBooks() {
            let queryLimit = 0;
            this.state.recentSearch.forEach((val: any) => {
                if(queryLimit < 14) {
                    queryLimit++;
                    axios.post(
                        `/books/${val.ref}`,
                    ).then((response: AxiosResponse) => {
                        this.addBook(response.data, val);
                    });
                }
            });
            // for(let i = 0; i < queryLim; i++) {
            //     axios.post(
            //         `/books/${this.state.recentSearch[i].ref}`,
            //     ).then((response: AxiosResponse) => {
            //         this.addBook(response.data, this.state.recentSearch[i]);
            //     });
            // }
        }

        addBook(bookObj: any, searchResults: ResponseObj) {
            this.setState({
                books: [
                    ...this.state.books,
                    {
                        ...bookObj[0],
                        score: searchResults.score
                    }
                ]
            });
        }

        removeBooks() {
            this.setState({
                books: []
            })
        }



    // Render
    // -----------------------------

    render() {
        return (
            <div className="InfoEntryPage">
                <div className="InfoContainer">
                    {!this.state.searched ? <div className="InfoTitleSection animated fadeIn">
                        <h1>Cover This</h1>
                        <span>For all your booking needs</span>
                    </div> : this.state.disappeared ? "" : <div className="InfoTitleSection animated fadeOutLeft">
                        <h1>Cover This</h1>
                        <span>For all your booking needs</span>
                    </div> }
                    <div className="InfoDataSection">
                        <h3>Insert Summary</h3>
                        <input 
                            type="text" 
                            title="bookTitle" 
                            placeholder=">"
                            value={this.state.searchArea} 
                            onChange={this.handleSearchChange.bind(this)}
                            onSubmit={()=>{this.searchBooks()}}
                        ></input>
                        <br/>
                        <a href="#" onClick={(e)=>{e.preventDefault(); this.searchBooks();}}>Begin</a>
                    </div>
                    {this.state.searched ? (<div className="InfoSearchedBooks">
                        {/* <h3>Books</h3> */}
                        {this.state.books.map((val: any[]) => {
                            // val.map((val2: any) => {
                                // console.log("Rendering Book Listings");
                                return(<BookListing bookObj={val} frontEnd={this.props.frontEnd}/>);
                            // });
                        })}
                    </div>) : ""}
                </div>
            </div>
        );
    }
}