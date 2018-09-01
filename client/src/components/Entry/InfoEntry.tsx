import * as React from "react";
import axios, { AxiosResponse } from "axios";

import "./InfoEntry.less";
import BookListing from "./BookListing";

import { FrontEndController } from "./../../service/controller";

interface ResponseObj {
    ref: string,
    score: number
}

export default class InfoEntry extends React.Component<{
    frontEnd: FrontEndController
},{
    searchArea: string,
    recentSearch: ResponseObj[],
    books: any[],
    searched: boolean
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchArea: "",
            recentSearch: [],
            books: [],
            searched: false
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
                    {!this.state.searched ? <div className="InfoTitleSection">
                        <h1>Cover This</h1>
                        <span>For all your booking needs</span>
                    </div> : ""}
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